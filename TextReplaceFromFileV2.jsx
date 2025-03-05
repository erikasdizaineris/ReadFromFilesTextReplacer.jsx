//replacerReadFromFiles.V2 for Illustrator by Erikas Vasiljevas
//replaces Illustrator text matching with first text file values to second file text values
//script runs throgh all open documents one by one

#target illustrator

// Create the dialog window
var dialog = new Window('dialog', 'File Selection');

// Create the first browse button and path label
var file1Group = dialog.add('group');
file1Group.orientation = 'row';
file1Group.add('statictext', undefined, 'Select File 1:');
var browseButton1 = file1Group.add('button', undefined, 'Browse...');
var filePath1 = file1Group.add('statictext', undefined, 'No file selected');

// Create the second browse button and path label
var file2Group = dialog.add('group');
file2Group.orientation = 'row';
file2Group.add('statictext', undefined, 'Select File 2:');
var browseButton2 = file2Group.add('button', undefined, 'Browse...');
var filePath2 = file2Group.add('statictext', undefined, 'No file selected');

//global variables
var contents2 = "";
var contents4 = "";

// Functions to handle file selection
function browseFile(filePathLabel) {
    var file = File.openDialog("Select 'search for...' text file", "*.txt");
file.open("e");
var contents1 = file.read();
file.close();
contents2 = contents1.split("\n");
    if (file) {
        filePathLabel.text = file.fullName; // Display the file path
    }
}
function browseFile2(filePathLabel) {
var file = File.openDialog("Select 'replace with...' text file", "*.txt");
file.open("e");
var contents3 = file.read();
file.close();
contents4 = contents3.split("\n");
    if (file) {
        filePathLabel.text = file.fullName; // Display the file path
    }
}


// Add event listeners for the browse buttons
browseButton1.onClick = function() {
    browseFile(filePath1);
};

browseButton2.onClick = function() {
    browseFile2(filePath2);
};

// Add Cancel and Confirm buttons at the bottom
var buttonGroup = dialog.add('group');
buttonGroup.orientation = 'row';
buttonGroup.alignment = 'center';
var cancelButton = buttonGroup.add('button', undefined, 'Cancel');
var confirmButton = buttonGroup.add('button', undefined, 'Confirm');

// Function to handle the Cancel button click
cancelButton.onClick = function() {
    dialog.close();
};

// Function to handle the Confirm button click
confirmButton.onClick = function() {
    alert('Files confirmed: \nFile 1: ' + filePath1.text + '\nFile 2: ' + filePath2.text);
    dialog.close();
};

// Show the dialog
dialog.show();



doc = app.activeDocument;

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