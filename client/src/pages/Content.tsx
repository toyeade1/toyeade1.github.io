// import { useParams } from "wouter";
// import { MarkdownRenderer } from "@/components/MarkdownRenderer";
// import { getContent } from "@/lib/data";

// export function Content() {
//   const params = useParams();
//   const content = getContent(params.section, params.slug);

//   if (!content) {
//     return (
//       <div className="max-w-3xl mx-auto">
//         <h1 className="text-2xl font-medium mb-4">Content Not Found</h1>
//         <p>The requested content could not be found.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-3xl mx-auto">
//       <MarkdownRenderer content={content} />
//     </div>
//   );
// }
import { useParams } from "wouter";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { useEffect, useState } from "react";
import { getContent } from "@/lib/data";

export function Content() {
  const params = useParams();
  const [content, setContent] = useState<string | null>(null);

  useEffect(() => {
    async function fetchContent() {
      const fetchedContent = await getContent(params.section, params.slug);
      setContent(fetchedContent);
    }
    fetchContent();
  }, [params.section, params.slug]);

  if (!content) {
    return (
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-medium mb-4">Content Not Found</h1>
        <p>The requested content could not be found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <MarkdownRenderer content={content} />
    </div>
  );
}