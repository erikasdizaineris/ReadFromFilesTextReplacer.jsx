//replacerReadFromFiles.V1 for Illustrator by Erikas Vasiljevas
//replaces Illustrator text matching with first text file values to second file text values
//script runs throgh all open documents one by one
doc = app.activeDocument;

var file = File.openDialog("Select 'search for...' text file", "*.txt");
file.open("e");
var contents1 = file.read();
file.close();
var contents2 = contents1.split("\n");

var file2 = File.openDialog("Select 'replace with...' text file", "*.txt");
file2.open("e");
var contents3 = file2.read();
file2.close();
var contents4 = contents3.split("\n");

var changes_made = false;

var documents = app.documents;

for (var i = 0; i < documents.length; i++) {

    app.activeDocument = documents[i];

    var text_frames = app.activeDocument.textFrames;    

    for (var j = 0; j < contents2.length; j++) {
        
        var search_string = contents2[j];
        var replace_string = contents4[j];

        for (var k = 0; k < text_frames.length; k++) {
                    
                    var text_frame = text_frames[k];

                    new_string = text_frame.contents.replace(new RegExp(search_string, 'g'), replace_string);
                    
                    if (new_string != text_frame.contents) {
                        text_frame.contents = new_string;
                        changes_made = true;
                        text_frame.textRange.fillColor = doc.swatches.getByName("CMYK Green").color;
                    }
                }
         
                }
            }

if (changes_made) {
    alert("Completed");
} else {
    alert("Failed");
}
