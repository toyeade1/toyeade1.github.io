import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { sections } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const [location] = useLocation();

  return (
    <aside className="w-64 border-r border-border p-4">
      <div className="mb-8">
        <Link href="/">
          <a className="text-xl font-medium">👾 Toye</a>
        </Link>
      </div>
      
      <nav className="space-y-1">
        {sections.map((section) => (
          <div key={section.id} className="space-y-1">
            <h2 className="text-sm font-medium text-muted-foreground mb-2">
              {section.title}
            </h2>
            {section.items.map((item) => (
              <Button
                key={item.slug}
                variant="ghost"
                className={cn(
                  "w-full justify-start",
                  location === item.path && "bg-accent"
                )}
                asChild
              >
                <Link href={item.path}>
                  <a>{item.title}</a>
                </Link>
              </Button>
            ))}
          </div>
        ))}
      </nav>

      <div className="mt-8">
        <Button variant="secondary" className="w-full">
            <a href="https://toyeade1.bearblog.dev/">Digital Garden Blog</a>
        </Button>
      </div>
    </aside>
  );
}
