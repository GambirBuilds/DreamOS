/**
 * DreamOS Vault & Data Portability Service
 * Handles exporting dreams to JSON, Markdown, and importing backups safely.
 */

import { storageService } from './storageService.js';

export const exportService = {
  /**
   * Export all dreams as a timestamped JSON file
   */
  exportToJson: (dreams) => {
    try {
      const payload = {
        app: 'DreamOS',
        version: '1.0.0',
        exportedAt: new Date().toISOString(),
        totalDreams: dreams.length,
        dreams
      };

      const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `dreamos_vault_backup_${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      return { success: true };
    } catch (err) {
      console.error('Export JSON failed:', err);
      return { success: false, error: err };
    }
  },

  /**
   * Export dreams as a formatted Markdown journal (.md) for Obsidian/Notion
   */
  exportToMarkdown: (dreams) => {
    try {
      let md = `# DreamOS Subconscious Journal\n\n`;
      md += `*Exported on ${new Date().toLocaleDateString()} — ${dreams.length} recorded dimensions*\n\n---\n\n`;

      dreams.forEach((d, idx) => {
        md += `## ${idx + 1}. ${d.title}\n\n`;
        md += `- **Date:** ${d.date || d.createdAt}\n`;
        md += `- **Mood:** ${d.mood}\n`;
        md += `- **Intensity:** ${d.intensity}/10\n`;
        md += `- **Category:** ${d.category}\n`;
        if (d.analysis?.archetype) {
          md += `- **Archetype:** ${d.analysis.archetype}\n`;
        }
        if (d.generatedWorld?.worldName) {
          md += `- **World Dimension:** ${d.generatedWorld.worldName}\n`;
        }
        md += `\n### Narrative\n\n> ${d.description}\n\n`;

        if (d.analysis?.themes?.length > 0) {
          md += `**Themes:** ${d.analysis.themes.join(' · ')}\n\n`;
        }
        if (d.generatedWorld?.locations?.length > 0) {
          md += `**Discovered Locations:**\n`;
          d.generatedWorld.locations.forEach((loc) => {
            md += `- *${loc.name}* (${loc.atmosphere}): ${loc.description}\n`;
          });
          md += `\n`;
        }
        md += `---\n\n`;
      });

      const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `dreamos_journal_${new Date().toISOString().slice(0, 10)}.md`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      return { success: true };
    } catch (err) {
      console.error('Export Markdown failed:', err);
      return { success: false, error: err };
    }
  },

  /**
   * Safely import dreams from a JSON file and merge into storage
   */
  importFromJson: async (file) => {
    try {
      const text = await file.text();
      const parsed = JSON.parse(text);

      let importedArray = [];
      if (Array.isArray(parsed)) {
        importedArray = parsed;
      } else if (parsed && Array.isArray(parsed.dreams)) {
        importedArray = parsed.dreams;
      } else {
        return { success: false, error: 'Invalid backup format' };
      }

      // Validate dream structure
      const validDreams = importedArray.filter(
        (d) => d && typeof d === 'object' && d.title && d.description
      );

      if (validDreams.length === 0) {
        return { success: false, error: 'No valid dream entries found in file.' };
      }

      const existingDreams = storageService.getDreams();
      const existingIds = new Set(existingDreams.map((d) => d.id));

      let addedCount = 0;
      validDreams.forEach((vd) => {
        if (!existingIds.has(vd.id)) {
          existingDreams.unshift(vd);
          addedCount++;
        }
      });

      storageService.saveAll(existingDreams);
      return { success: true, count: addedCount, total: existingDreams.length };
    } catch (err) {
      console.error('Import failed:', err);
      return { success: false, error: 'Failed to read backup file.' };
    }
  }
};
