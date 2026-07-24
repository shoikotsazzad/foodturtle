// Renders a <title> tag directly in the page tree. React 19 hoists title/meta/link
// tags rendered anywhere in the component tree up into <head>, overriding the
// static title from the root layout's metadata — this is the reliable way to
// set a per-page tab title from a client component (manually mutating
// document.title in a useEffect gets stomped back by React's own reconciliation
// of the layout's <title> on the next render).
export default function PageTitle({ title }: { title: string }) {
  return <title>{title}</title>;
}
