export default function humanizeString(str) {
  return str.replace(/_/g, ' ').replace(/(\w+)/g, function(match) {
    return match.charAt(0).toUpperCase() + match.slice(1);
  });
}
