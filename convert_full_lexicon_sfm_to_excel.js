// Kalinda Pride, 2020-12-21

// Converts the FLEx lexicon to an Excel file. 
// This version is for Windows (\r\n line endings). 
// First, export the lexicon from FLEx using the "Full lexicon (root-based) SFM" format.
// (I believe the "Full lexicon (stem-based) SFM" format also works, but I haven't tested it.)
// Then, run this program, providing the name of the exported lexicon as a command-line argument.
// Finally, open the output file in a text editor like sublime or Notepad++, 
// and copy-paste its contents into a blank Excel file. 
// (If some of the characters are displaying weirdly, make sure your text editor's encoding is set to UTF-8.)
// You can then edit the Excel file to reorder or hide rows and columns. 

const fs = require("fs");

let filenameIn;
let filenameOut;
let maxArgIndex = 0;
const keysSet = new Set();

process.argv.forEach(function (val, index, array) {
	maxArgIndex = index;
	if (index === 2) {
		filenameIn = val;
    filenameOut = val + ".out.txt";
	} else if (index === 3) {
		console.log("Too many arguments. Continuing anyway...");
	}
});

if (maxArgIndex < 2) {
	console.log("Syntax: \n node full-lexicon-rootbased-sfm_to_excel.js inputfile\n where inputfile is the name of a file that has been exported from FLEx.\n The output will be saved as inputfile.out.txt, a tab-separated file\n whose contents can be copy-pasted into Excel.");
} else {
	try {
		main();
	} catch (err) {
		console.log("❌" + "  " + " File not found!  \nExiting...");
    console.log(err);
	}
}

function main() {
  const dataIn = fs.readFileSync(filenameIn, "utf8")
  const entries = dataIn.split("\r\n\r\n").map(lines => lines.split("\r\n").map(s => s.substring(1)));
  // ignore first character because it's always a backslash

  const entryDicts = entries.map(entry => dictFromEntry(entry));
  
  const keys = Array.from(keysSet);

  // prefix each cell with ' so Excel won't try to apply special formatting
  const linesOut = [ keys.map(k => excelEscape(k)).join("\t") ];
  for (entry of entryDicts) {
    linesOut.push(keys.map(k => entry[k] || "").map(e => excelEscape(e)).join("\t"));
  }
  console.log(linesOut);
  
  fs.writeFileSync(filenameOut, linesOut.join('\r\n'), 'utf8');
}

function dictFromEntry(entry) {
  let dict = {};
  for (line of entry) {
    let splitIndex = line.indexOf(' ');
    if (splitIndex >= 0) { // ignore empty or malformed lines
      const key = line.substring(0, splitIndex);
      dict[key] = line.substring(splitIndex + 1);
      keysSet.add(key);
    }
  }
  return dict;
}

function excelEscape(str) {
  if (str[0] === "'" || str[0] === "=") {
    return "'" + str;
  } else {
    return str;
  }
}