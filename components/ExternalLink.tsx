export default function ExternalLink(props) {
  if (props.href[0] === '/') {
    return <a href={props.href}>{props.children}</a>
  }

  return (
    <a href={props.href} target="_blank" rel="noopener noreferrer">
      {props.children}
    </a>
  )
}
