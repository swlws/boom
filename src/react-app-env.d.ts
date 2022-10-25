/// <reference types="react-scripts" />

// declare module "react" {
//   interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
//     // extends React's HTMLAttributes
//     custom?: string;
//     require?: string | null;
//   }
// }

// declare module "react" {
//   interface HTMLProps<T> {
//     size?: string;
//     require?: string | null;
//   }
// }

declare global {
  namespace TSX {
    interface IntrinsicElements {
      require: any;
    }
  }
}
