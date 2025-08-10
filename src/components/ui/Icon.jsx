const Icon = ({ children, size = 18, strokeWidth = 1.75, className = "" }) => {
  if (!children) return null;
  return children({ size, strokeWidth, className: `shrink-0 ${className}` });
};
export default Icon;
