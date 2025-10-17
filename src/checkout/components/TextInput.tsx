import { type AllHTMLAttributes } from "react";
import clsx from "clsx";
import { Field, type FieldProps } from "formik";

export interface TextInputProps<TName extends string> extends AllHTMLAttributes<HTMLInputElement> {
	name: TName;
	label: string;
}

export const TextInput = <TName extends string>(props: TextInputProps<TName>) => (
	<Field {...props} component={TextInputComponent} />
);

export const TextInputComponent = <TName extends string>({
	field,
	form: { touched, errors },
	label,
	required,
	...props
}: TextInputProps<TName> & FieldProps) => {
	const error = touched[field.name] ? (errors[field.name] as string) : undefined;

	return (
		<div className="space-y-0.5">
			<label className="flex flex-col">
				<span className="text-xs text-neutral-700 dark:text-neutral-300">
					{label}
					{required && <span aria-hidden="true">*</span>}
				</span>
				<input
					required={required}
					spellCheck={false}
					{...field}
					{...props}
					className={clsx(
						"mt-0.5 w-full appearance-none rounded-md border-neutral-300 shadow-sm transition-colors focus:border-neutral-300 focus:outline-none focus:ring focus:ring-neutral-200 focus:ring-opacity-50 active:border-neutral-200 active:outline-none dark:border-neutral-600 dark:bg-neutral-700 dark:text-neutral-100 dark:focus:border-neutral-500 dark:focus:ring-neutral-500",
						{ "border-red-300": error },
						props.className,
					)}
				/>
			</label>
			{error && <p className="text-sm text-red-500 dark:text-red-400">{error}</p>}
		</div>
	);
};
