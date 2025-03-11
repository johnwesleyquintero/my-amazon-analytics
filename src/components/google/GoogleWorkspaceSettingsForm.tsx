
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { RefreshCw, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { extractSpreadsheetId, testSpreadsheetConnection } from '@/utils/googleWorkspace';

interface GoogleWorkspaceSettingsFormProps {
  spreadsheetId: string;
  sheetName: string;
  autoSync: boolean;
  onSpreadsheetIdChange: (id: string) => void;
  onSheetNameChange: (name: string) => void;
  onAutoSyncChange: (enabled: boolean) => void;
  onSave: () => void;
  isLoading: boolean;
}

export function GoogleWorkspaceSettingsForm({
  spreadsheetId,
  sheetName,
  autoSync,
  onSpreadsheetIdChange,
  onSheetNameChange,
  onAutoSyncChange,
  onSave,
  isLoading
}: GoogleWorkspaceSettingsFormProps) {
  const { toast } = useToast();
  const [testLoading, setTestLoading] = React.useState(false);

  const handleSheetUrlChange = (url: string) => {
    const id = extractSpreadsheetId(url);
    if (id) {
      onSpreadsheetIdChange(id);
    }
  };

  const handleTestConnection = async () => {
    if (!spreadsheetId) {
      toast({
        title: "Missing spreadsheet ID",
        description: "Please enter a valid Google Sheets URL or ID",
        variant: "destructive"
      });
      return;
    }

    setTestLoading(true);
    try {
      await testSpreadsheetConnection(spreadsheetId);
      toast({
        title: "Connection successful",
        description: "Successfully connected to Google Sheets. The sheet is publicly accessible."
      });
    } catch (error) {
      toast({
        title: "Connection failed",
        description: error instanceof Error ? error.message : "Failed to connect to Google Sheets",
        variant: "destructive"
      });
    } finally {
      setTestLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="spreadsheet">Google Sheets URL</Label>
          <Input
            id="spreadsheet"
            placeholder="Paste your Google Sheets URL"
            value={spreadsheetId ? `https://docs.google.com/spreadsheets/d/${spreadsheetId}` : ''}
            onChange={(e) => handleSheetUrlChange(e.target.value)}
          />
          <p className="text-sm text-muted-foreground">
            Make sure your Google Sheet is publicly accessible (Anyone with the link can view)
          </p>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="sheetName">Sheet Name (Optional)</Label>
          <Input
            id="sheetName"
            placeholder="e.g., Sheet1"
            value={sheetName}
            onChange={(e) => onSheetNameChange(e.target.value)}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Auto Sync</Label>
            <div className="text-sm text-muted-foreground">
              Automatically sync data every hour
            </div>
          </div>
          <Switch
            checked={autoSync}
            onCheckedChange={onAutoSyncChange}
          />
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleTestConnection}
          disabled={testLoading || !spreadsheetId}
        >
          {testLoading ? (
            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <RefreshCw className="mr-2 h-4 w-4" />
          )}
          Test Connection
        </Button>
        <Button
          onClick={onSave}
          disabled={isLoading || !spreadsheetId}
        >
          <Save className="mr-2 h-4 w-4" />
          Save Settings
        </Button>
      </div>
    </div>
  );
}
