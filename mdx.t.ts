declare module "*.mdx" {
  import type { ReactNode } from "react";
  const content: (props: any) => ReactNode;
  export default content;
}
