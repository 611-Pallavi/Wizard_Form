import "@/Styles/GlobalModules/FormLabel.css"

type Props = {
  label: string;
  htmlFor?: string;
  required?: boolean;
  className?: string;
};
export default function FormLabel({
  label,
  htmlFor,
  required = false,
}: Props) {
  return (
    <label htmlFor={htmlFor}>
      {label} {required && <span className="asterisk">*</span>}
    </label>
  );
}