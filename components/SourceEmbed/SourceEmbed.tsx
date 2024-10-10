import React from "react";
import { Youtube, LinkIcon, AlertTriangle, ExternalLink } from "lucide-react";

export type EmbedType = "none" | "website" | "youtube" | "text";
interface SourceEmbedProps {
  sourceUrl: string;
  setSourceUrl: (url: string) => void;
  sourceContent: string;
  setSourceContent: (content: string) => void;
  embedType: EmbedType;
  error: string | null;
  embedYoutube: () => void;
  embedWebsite: () => void;
  embedText: () => void;
  getYoutubeEmbedUrl: (url: string) => string;
}

export const SourceEmbed: React.FC<SourceEmbedProps> = ({
  sourceUrl,
  setSourceUrl,
  sourceContent,
  setSourceContent,
  embedType,
  error,
  embedYoutube,
  embedWebsite,
  embedText,
  getYoutubeEmbedUrl,
}) => {
  return (
    <aside className="w-full lg:w-1/3 p-6 border-t lg:border-l lg:border-t-0">
      <h2 className="text-xl font-semibold mb-4">Sources</h2>
      <div className="flex flex-col space-y-2 mb-4">
        <input
          type="text"
          placeholder="Enter website or YouTube URL"
          className="p-2 border rounded-md"
          value={sourceUrl}
          onChange={(e) => setSourceUrl(e.target.value)}
        />
        <div className="flex space-x-2">
          <button
            className="flex-1 bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition-colors flex items-center justify-center"
            onClick={embedYoutube}
          >
            <Youtube className="w-4 h-4 mr-2" />
            Embed YouTube
          </button>
          <button
            className="flex-1 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors flex items-center justify-center"
            onClick={embedWebsite}
          >
            <LinkIcon className="w-4 h-4 mr-2" />
            Embed Website
          </button>
        </div>
        <textarea
          placeholder="Or paste text content here"
          className="p-2 border rounded-md min-h-[100px] resize-y"
          value={sourceContent}
          onChange={(e) => setSourceContent(e.target.value)}
        />
        <button
          className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600 transition-colors"
          onClick={embedText}
        >
          Embed Text
        </button>
      </div>
      {error && (
        <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded flex items-center">
          <AlertTriangle className="w-5 h-5 mr-2" />
          {error}
        </div>
      )}
      <div className="border rounded-md p-4 min-h-[300px] bg-gray-50">
        {embedType === "none" && (
          <p className="text-gray-400">No source content embedded yet.</p>
        )}
        {embedType === "website" && (
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Due to security restrictions, we embed this website
              directly. You can visit it in a new tab instead:
            </p>
            <a
              href={sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Open Website
            </a>
          </div>
        )}
        {embedType === "youtube" && (
          <iframe
            src={getYoutubeEmbedUrl(sourceUrl)}
            title="YouTube video player"
            className="w-full h-[315px]"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        )}
        {embedType === "text" && (
          <div className="prose max-w-full">
            {sourceContent.split("\n").map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
};

export default SourceEmbed;
