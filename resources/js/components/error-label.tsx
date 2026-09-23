interface ErrorLabelProps {
    error: string | undefined;
}

export default function ErrorLabel({ error }: ErrorLabelProps) {
    return <>{error && <p className="text-red-500">{error}</p>}</>;
}
