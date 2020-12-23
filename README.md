# FLEx-to-Excel
 Export the Lexicon from Fieldworks Language Explorer (FLEx) into Microsoft Excel
 
FLEx offers many options for exporting the lexicon (see their [tutorial](https://software.sil.org/fieldworks/resources/tutorial/lexicon/import-export/) and [deep-dive](https://software.sil.org/fieldworks/wp-content/uploads/sites/38/2018/03/Export-options-in-Flex.pdf)), but surprisingly, none of the export formats can be opened in Excel or Google Sheets. I wrote this script to turn FLEx's SMB export format into a tab-separated file, which can be copy-pasted into Microsoft Excel or Google Sheets. 

## Usage
To use:
1. Download the `convert_full_lexicon_sfm_to_excel.js` script.
2. Export the lexicon from FLEx using the "Full lexicon (root-based) SFM" format.
(I believe the "Full lexicon (stem-based) SFM" format also works, but I haven't tested it.)
3. Run the script, providing the name of the exported lexicon as a command-line argument. For example: `node convert_full_lexicon_sfm_to_excel.js exported_lexicon.db`. In this example, the output file will be saved as `exported_lexicon.db.out.txt`.
4. Open the output file in a text editor like sublime or Notepad++, and copy-paste its contents into a blank Excel file. (If some of the characters are displaying weirdly, make sure your text editor's encoding is set to UTF-8.)
5. You can then edit the Excel file to reorder or hide rows and columns. 

The current version of the script is for Windows, where a newline is represented by two characters: `\r\n`. 


## Input format
There's nothing FLEx-specific about this script, so you could use it to convert any similarly-formatted file to a tab-separated file. The script only assumes that
1. the input file consists of records, each separated by a double newline
2. within each record, fields are separated by a single newline
3. each nonempty line consists of a backslash, then the field name, then a space, followed by the (possibly empty) field value. Field values can contain any UTF-8 character except a newline.

For example:
```
\field1 Here is a record
\field2 with three fields,
\field3 blah blah blah. 

\field2 Subsequent records are allowed to have some of the same fields,
\field1 not necessarily in the same order,
\field4 and they're also allowed to introduce new fields. 
```

## Questions? Problems?
Contact kalinda.pride@gmail.com. 