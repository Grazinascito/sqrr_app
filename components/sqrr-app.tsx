/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Search,
  HelpCircle,
  Book,
  MessageCircle,
  Link as LinkIcon,
  Youtube,
  AlertTriangle,
  ExternalLink,
} from "lucide-react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Badge } from "./ui/badge";
import SourceEmbed, { EmbedType } from "./SourceEmbed/SourceEmbed";

const RichTextEditor = ({ placeholder }: { placeholder: string }) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "",
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl focus:outline-none",
      },
    },
  });

  return (
    <div className="mt-4 border rounded-md overflow-hidden">
      <EditorContent
        editor={editor}
        className="min-h-[100px] p-3"
        placeholder={placeholder}
      />
    </div>
  );
};

export function SqrrApp() {
  // const [activeStep, setActiveStep] = useState(false);
  const [sourceUrl, setSourceUrl] = useState("");
  const [sourceContent, setSourceContent] = useState("");
  const [embedType, setEmbedType] = useState<EmbedType>("none");
  const [error, setError] = useState("");

  const getYoutubeEmbedUrl = (url: string) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11
      ? `https://www.youtube.com/embed/${match[2]}`
      : null;
  };

  const embedYoutube = () => {
    const embedUrl = getYoutubeEmbedUrl(sourceUrl);
    if (embedUrl) {
      setEmbedType("youtube");
      setError("");
    } else {
      setError("Invalid YouTube URL");
    }
  };

  const embedWebsite = () => {
    if (sourceUrl.startsWith("http://") || sourceUrl.startsWith("https://")) {
      setEmbedType("website");
      setError("");
    } else {
      setError("Invalid website URL");
    }
  };

  const embedText = () => {
    if (sourceContent.trim()) {
      setEmbedType("text");
      setError("");
    } else {
      setError("Please enter some text content");
    }
  };

  const steps = [
    {
      title: "Survey",
      icon: <Search className="w-5 h-5" />,
      color: "bg-amber-50",
      tasks: [
        "Quickly skim through the documentation to get an overview.",
        "Look at headings and subheadings.",
        "Check for any visual aids like charts or graphs.",
      ],
    },
    {
      title: "Question",
      icon: <HelpCircle className="w-5 h-5" />,
      color: "bg-yellow-50",
      tasks: [
        "Turn headings and subheadings into questions.",
        "Write down any questions that come to mind.",
        "Consider what you already know about the topic.",
      ],
    },
    {
      title: "Read",
      icon: <Book className="w-5 h-5" />,
      color: "bg-green-50",
      tasks: [
        "Read the sections thoroughly to find answers to your questions.",
        "Take notes on key points, definitions, and examples.",
        "Pay attention to bold or italicized text.",
      ],
    },
    {
      title: "Recite",
      icon: <MessageCircle className="w-5 h-5" />,
      color: "bg-blue-50",
      tasks: [
        "Summarize the information in your own words without looking at your notes.",
        "Try to answer the questions you formulated earlier.",
        "Identify any areas that need further clarification.",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <header className="bg-gray-800 text-white p-4">
          <h1 className="text-2xl font-bold">Leitura utilizando SQRR</h1>
        </header>
        <nav className="bg-gray-100 p-4 flex space-x-4">
          <button className="px-4 py-2 bg-white rounded shadow">Notes</button>
        </nav>
        <div className="flex flex-col lg:flex-row">
          <main className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`${step.color} rounded-lg p-6 shadow`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold flex items-center">
                    {step.icon}
                    <span className="ml-2">
                      Step {index + 1}: {step.title}
                    </span>
                  </h2>
                </div>
                <ul className="space-y-2">
                  {step.tasks.map((task, taskIndex) => (
                    <li key={taskIndex} className="flex items-start">
                      <Checkbox
                        id={`${step.title}-${taskIndex}`}
                        className="mr-2 mt-1"
                      />
                      <label
                        htmlFor={`${step.title}-${taskIndex}`}
                        className="text-sm"
                      >
                        {task}
                      </label>
                    </li>
                  ))}
                </ul>
                <RichTextEditor placeholder="Take notes here..." />
              </div>
            ))}
          </main>
          <SourceEmbed
            sourceUrl={sourceUrl}
            setSourceUrl={setSourceUrl}
            sourceContent={sourceContent}
            setSourceContent={setSourceContent}
            embedType={embedType}
            error={error}
            embedYoutube={embedYoutube}
            embedWebsite={embedWebsite}
            embedText={embedText} getYoutubeEmbedUrl={function (url: string): string {
              throw new Error("Function not implemented.");
            } }          />
        </div>
      </div>
    </div>
  );
}
