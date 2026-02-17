import { cn } from "@/lib/utils";

interface Message {
    id: string;
    text: string;
    isUser: boolean;
    timestamp: Date;
}

export default function MessageBubble({ message }: { message: Message }) {
    return (
        <div
            className={cn(
                "flex w-full mb-4",
                message.isUser ? "justify-end" : "justify-start"
            )}
        >
            <div
                className={cn(
                    "max-w-[80%] rounded-lg p-3 text-sm",
                    message.isUser
                        ? "bg-primary text-primary-foreground rounded-br-none"
                        : "bg-muted text-muted-foreground rounded-bl-none"
                )}
            >
                <p>{message.text}</p>
                <span className="text-[10px] opacity-70 mt-1 block">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
            </div>
        </div>
    );
}
