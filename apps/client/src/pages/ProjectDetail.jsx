import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { projectsApi } from "../lib/api";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { PageSkeleton } from "../components/ui/Skeleton";
import { KanbanBoard } from "../components/tasks/KanbanBoard";

export default function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = () =>
    projectsApi.get(id).then((res) => setProject(res.data.data.project)).finally(() => setLoading(false));

  useEffect(() => {
    load();
  }, [id]);

  if (loading) return <PageSkeleton />;
  if (!project) return null;

  return (
    <div className="space-y-6">
      <div>
        <Badge>{project.status}</Badge>
        <h1 className="mt-2 font-display text-3xl font-bold">{project.title}</h1>
        <p className="text-muted">{project.description}</p>
      </div>
      <Card>
        <h2 className="mb-4 font-display font-semibold">Mission Board</h2>
        <KanbanBoard tasks={project.tasks || []} onUpdate={load} />
      </Card>
    </div>
  );
}
