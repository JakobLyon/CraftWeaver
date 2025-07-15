export interface ParsedArgs {
  gameId: string;
  itemId: string;
  format?: "json" | "table";
}

export interface ReportOutput {
  result: string; // preformatted, for CLI output
}
