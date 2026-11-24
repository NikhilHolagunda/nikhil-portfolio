import { ArrowUp } from "lucide-react";

import { profile } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export function SiteFooter() {
  return (
    <footer className="mx-auto max-w-6xl px-5 pb-10 sm:px-8">
      <Separator />
      <div className="flex flex-col items-center justify-between gap-4 pt-8 text-sm text-muted-foreground sm:flex-row">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <Button asChild variant="ghost" size="sm">
          <a href="#top">
            Back to top <ArrowUp aria-hidden />
          </a>
        </Button>
      </div>
    </footer>
  );
}
