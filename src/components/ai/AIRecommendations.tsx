
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lightbulb, Loader2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { analyzeSearchTerms, generateOptimizationSuggestion } from "@/integrations/gemini/api";
import { toast } from "@/hooks/use-toast";

interface AIRecommendationsProps {
  searchTermData?: any[];
  isLoading?: boolean;
}

export function AIRecommendations({ searchTermData, isLoading }: AIRecommendationsProps) {
  const [recommendations, setRecommendations] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [customPrompt, setCustomPrompt] = useState("");

  const generateRecommendations = async () => {
    try {
      setIsGenerating(true);
      
      if (searchTermData && searchTermData.length > 0) {
        const analysis = await analyzeSearchTerms(searchTermData);
        setRecommendations(analysis);
      } else {
        toast({
          title: "No data available",
          description: "We need search term data to generate recommendations.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Error generating recommendations:", error);
      toast({
        title: "Error",
        description: "Failed to generate recommendations. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCustomPrompt = async () => {
    try {
      if (!customPrompt.trim()) {
        toast({
          title: "Empty prompt",
          description: "Please enter a prompt to generate recommendations.",
          variant: "destructive"
        });
        return;
      }

      setIsGenerating(true);
      const result = await generateOptimizationSuggestion(customPrompt);
      setRecommendations(result);
    } catch (error) {
      console.error("Error processing custom prompt:", error);
      toast({
        title: "Error",
        description: "Failed to process your prompt. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-gray-900">
          <Lightbulb className="h-5 w-5 text-amber-500" />
          AI-Powered Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col gap-3">
          <div className="flex gap-3">
            <Button 
              onClick={generateRecommendations} 
              disabled={isGenerating || isLoading || !searchTermData}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
            >
              {isGenerating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Lightbulb className="mr-2 h-4 w-4" />}
              Analyze Search Terms
            </Button>
            <Button 
              onClick={() => setRecommendations("")} 
              variant="outline"
              disabled={!recommendations || isGenerating}
            >
              Clear
            </Button>
          </div>
          
          <div className="mt-4">
            <p className="text-sm text-gray-500 mb-2">Or ask a specific question:</p>
            <div className="flex gap-2">
              <Textarea 
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                placeholder="E.g., How can I improve my ACOS for my top 5 keywords?"
                className="flex-1 text-gray-800"
              />
              <Button 
                onClick={handleCustomPrompt} 
                disabled={isGenerating || !customPrompt.trim()}
                variant="secondary"
              >
                {isGenerating ? <Loader2 className="h-4 w-4 animate-spin" /> : "Ask"}
              </Button>
            </div>
          </div>
        </div>

        {isGenerating ? (
          <div className="flex justify-center items-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          </div>
        ) : recommendations ? (
          <div className="mt-4 p-4 bg-gray-50 rounded-md border border-gray-200 text-gray-800 whitespace-pre-line">
            {recommendations}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-8 text-center text-gray-500">
            <Lightbulb className="h-12 w-12 text-gray-300 mb-2" />
            <p>Use AI to analyze your search terms and get optimization recommendations.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
