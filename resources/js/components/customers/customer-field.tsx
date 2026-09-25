import { useState } from "react";
import { Button } from "../ui/button";
import { Check, Copy } from "lucide-react";

interface ContactFieldProps {
    label: string;
    value: string | null;
    copyable?: boolean;
}

export default function CustomerField({
    label,
    value,
    copyable = false,
}: ContactFieldProps) {
    const [copied, setCopied] = useState(false);
    const copyToClipboard = async (text: string) => {
        try {
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(text);
            } else {
                // 2. Fallback for HTTP or legacy browsers
                const textArea = document.createElement("textarea");
                textArea.value = text;

                // Keep offscreen and hidden
                textArea.style.position = "fixed";
                textArea.style.left = "-999999px";
                textArea.style.top = "-999999px";
                textArea.style.opacity = "0";
                document.body.appendChild(textArea);

                textArea.focus();
                textArea.select();

                const successful = document.execCommand("copy");
                textArea.remove();

                if (!successful) {
                    throw new Error("Copy command failed");
                }

                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            }
        } catch (err) {
            console.error("Failed to copy text: ", err);
        }
    };
    return (
        <div>
            <p className="text-muted-foreground text-sm font-semibold uppercase">
                {label}
            </p>

            <p className="font-bold">
                {value || "N/A"}{" "}
                {value && copyable && (
                    <Button
                        variant="ghost"
                        size="xs"
                        onClick={() => copyToClipboard(value)}
                    >
                        {copied ? <Check /> : <Copy />}
                    </Button>
                )}
            </p>
        </div>
    );
}
