const prisma = require("../../core/database/prisma");
const { AppError } = require("../../core/errors");
const { getTaskerIdsForReviewer } = require("../dashboard/dashboard.service");
const { logActivity, notifyUser } = require("../../shared/services/activity.service");

async function listForReview(user, { filter = "all", projectId } = {}) {
  const ids = await getTaskerIdsForReviewer(user);
  const where = { userId: { in: ids } };

  if (filter === "needs_review") {
    where.status = "COMPLETED";
    where.qualityScore = null;
  } else if (filter === "reviewed") {
    where.qualityScore = { not: null };
  } else {
    where.status = { in: ["COMPLETED", "IN_PROGRESS"] };
  }

  if (projectId) where.projectId = projectId;

  return prisma.workItem.findMany({
    where,
    include: {
      user: { select: { id: true, name: true, avatar: true } },
      project: { select: { id: true, code: true } },
      reviewedBy: { select: { id: true, name: true } },
    },
    orderBy: { updatedAt: "desc" },
    take: 50,
  });
}

async function reviewItem(id, user, { qualityScore, reviewComment }) {
  const ids = await getTaskerIdsForReviewer(user);
  const item = await prisma.workItem.findUnique({
    where: { id },
    include: { user: true, project: true },
  });
  if (!item || !ids.includes(item.userId)) {
    throw new AppError("Work item not found", 404, "NOT_FOUND");
  }

  const updated = await prisma.workItem.update({
    where: { id },
    data: {
      qualityScore: qualityScore / 100,
      reviewComment: reviewComment || null,
      reviewedAt: new Date(),
      reviewedById: user.id,
    },
    include: {
      user: { select: { id: true, name: true, avatar: true } },
      project: { select: { code: true } },
      reviewedBy: { select: { name: true } },
    },
  });

  await logActivity({
    type: "TASK_REVIEWED",
    message: `${user.name} scored "${item.title}" at ${qualityScore}%`,
    actorId: user.id,
    entityId: item.id,
    entityType: "work_item",
  });

  if (item.user.qualityReviewerId) {
    await notifyUser(item.userId, {
      title: "Task reviewed",
      message: `Your task "${item.title}" was scored ${qualityScore}%`,
      type: "TASK_REVIEWED",
      link: "/task-review",
    });
  }

  return updated;
}

module.exports = { listForReview, reviewItem };
