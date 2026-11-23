import { Button } from "@/components/ui/Button";
import { Container } from "@/components/shared/Container";
import { EmptyState } from "@/components/shared/EmptyState";

// صفحة بسيطة لأي رابط مش موجود
export function NotFound() {
  return (
    <Container>
      <div className="my-10">
        <EmptyState title="Page not found" text="The page you are looking for does not exist.">
          <Button to="/" variant="teal">
            Back to home
          </Button>
        </EmptyState>
      </div>
    </Container>
  );
}
