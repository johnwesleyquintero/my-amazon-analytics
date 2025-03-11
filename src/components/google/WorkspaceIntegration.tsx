
import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Database } from 'lucide-react';
import { useGoogleWorkspaceSettings } from '@/hooks/useGoogleWorkspaceSettings';
import { GoogleWorkspaceSettingsForm } from './GoogleWorkspaceSettingsForm';
import { GoogleWorkspaceErrorBoundary } from './GoogleWorkspaceErrorBoundary';

export function WorkspaceIntegration() {
  const { settings, saveMutation } = useGoogleWorkspaceSettings();
  const [spreadsheetId, setSpreadsheetId] = React.useState('');
  const [sheetName, setSheetName] = React.useState('');
  const [autoSync, setAutoSync] = React.useState(false);

  useEffect(() => {
    if (settings) {
      setSpreadsheetId(settings.spreadsheet_id || '');
      setSheetName(settings.sheet_name || '');
      setAutoSync(settings.auto_sync || false);
    }
  }, [settings]);

  const handleSaveSettings = () => {
    saveMutation.mutate({
      spreadsheet_id: spreadsheetId,
      sheet_name: sheetName,
      auto_sync: autoSync,
    });
  };

  return (
    <GoogleWorkspaceErrorBoundary>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Google Workspace Integration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <GoogleWorkspaceSettingsForm
            spreadsheetId={spreadsheetId}
            sheetName={sheetName}
            autoSync={autoSync}
            onSpreadsheetIdChange={setSpreadsheetId}
            onSheetNameChange={setSheetName}
            onAutoSyncChange={setAutoSync}
            onSave={handleSaveSettings}
            isLoading={saveMutation.isPending}
          />
        </CardContent>
      </Card>
    </GoogleWorkspaceErrorBoundary>
  );
}
