export interface Reporter {
    cite_type: string;
    editions: { [key: string]: { start: string; end: string | null } };
    mlz_jurisdiction: string[];
    name: string;
    variations: { [key: string]: string };
  }

export interface Laws {
    cite_type: string;
    name: string;
    end: string;
    examples: string[];
    href: string;
    jurisdiction: string;
    regexes: string[];
    start: string;
    variations: string[];
  }