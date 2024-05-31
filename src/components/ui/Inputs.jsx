export function Label({ className, children, ...rest }) {
  return (
    <span
      className={`text-base font-bold leading-5 text-left ${className}`}
      {...rest}>
      {children}
    </span>
  );
}
export function Input({ className, ...rest }) {
  return (
    <input
      className={`block bg-gray-100 border border-transparent w-full rounded-md py-3 px-6 text-base leading-6 mb-2 outline-blue box-border resize-none`}
      {...rest}
    />
  );
}

export function TextArea({ className, ...rest }) {
  return (
    <textarea
      className={`block bg-gray-100 border border-transparent w-full rounded-md py-3 px-6 text-base leading-6 mb-2 outline-blue box-border resize-none`}
      {...rest}></textarea>
  );
}
