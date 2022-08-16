# Tabelar Text Difference

## Purpose and Scope

- This is a simple tool to compare two tables of text. It is useful for comparing two versions of a table, or for comparing two tables of the same data.
- This tool is not intended to be used for comparing large tables. It is intended to be used for comparing small tables, such as those used in a spreadsheet or database.

## How to Use

- The tool is available at [https://ivanoiupetrut.github.io/tabelar-text-difference/](https://ivanoiupetrut.github.io/tabelar-text-difference/).
- The tool is a single page application. It does not require any installation or configuration.
- The tool is designed to be used in a web browser. It has been tested in the latest versions of Chrome, Firefox, and Safari.

## Functionality

### Input

- The tool accepts two tables of text as input. The tables don't need the same number of columns.
- The tool does not require that the tables to be fromated in any particular way. The tool will attempt to parse the tables from the input text.
  | Syntax | Description |
  | ------------ | ------------------ |
  | line brake | new line for table |
  | space(one or more) | new column for table |

### Output

- The tool has 3 modes to see the result of the comparison. This can be selected by clicking the buttons at the top of the page.
  - **match** - Highlight the matching cells in green.
  - **no match** - Highlight the cells that do not match in red.
  - **both** - Highlight the matching cells in green and the cells that do not match in red.

### Process

#### Parsing the input

- Takes the input text and parses it into one bidimensional array for each table.
- The first row of the array is the header. The rest of the rows are the data.

#### Comparing the tables

- Each row first entry is compared to the other table to find a match. If a match is found, the next entry is compared to the other table to find a match. This continues until a match is not found or the end of the row is reached. Every entry that is matched is highlighted in green, different entry is highlighted in red.
- If a row matches by first entry in the other table but not by the second entry, row will be highlighted in red.
- If a match is not found, the next row is compared to the other table to find a match. This continues until a match is found or the end of the table is reached.

## Limitations

- The tool does not support tables with a lot of columns. The tool will attempt to parse the tables, but the result may be displayed in a hard to read format.
- The tool does not support tables with a lot of rows. The tool will attempt to parse the tables, but the result may be displayed in a hard to read format.
- The input of an entry in a table can not contain a line break. The tool will attempt to parse the tables, creating a new row.
- The input of an entry in a table can not contain space characters. The tool will attempt to parse the tables, creating a new entry.

## Future Work

- Add support for tables with a lot of columns.
- Add support for tables with a lot of rows.
- Add support for tables with line breaks in the entries.
- Add support for tables with space characters in the entries.
