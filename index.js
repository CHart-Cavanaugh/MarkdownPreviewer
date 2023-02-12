// v v v Markdown Syntax Shortcuts v v v
/* 
  Headings:
    # Heading Level 1
    ## Heading Level 2
    ### Heading Level 3
    #### Heading Level 4
    ##### Heading Level 5
    ###### Heading Level 6
    
  Code Spans:
    Code wrapped between "`" and "`" or "` " and " `"
    
  Fenced Code Blocks:
    Code wrapped between "'''\n" and "'''" or "~~~\n" and "~~~"
  
  Bold Text:
    Text wrapped between "**" and "**"
  
  Italic Text:
    Text wrapped between "_" and "_"
    
  Bold & Italic Text:
    Text wrapped between "**_" and "_**"
    
  Strike-through:
    Text wrapped between "~~" and "~~"
  
 Links:
    [linkText](linkHref)
 
 Blockquotes:
    Text lines that start with ">" or "> "
 
 Tables:
     Heading 1 | Heading 2 | Heading 3 | ... | Heading n
     ----------|-----------|-----------|-----|----------|
     r1c1 | r1c2 | r1c3 | ... | r1cN
     r2c1 | r2c2 | r2c3 | ... | r2cN
     r3c1 | r3c2 | r3c3 | ... | r3cN
     ...
     rNc1 | rNc2 | rNc3 | ... | rNcN
    
 Unordered Lists:
   Level 0: Text lines that start with "- listItemName".
   Level 1: Text lines starts with "  - listItemName" and follows a "Level 0" list item.
   Level 2: Text lines starts with "    - listItemName" and follows a "Level 1" list item.
   Level 3: Text lines starts with "      - listItemName" and follows a "Level 2" list item.
   ...
   Level N: Text lines starts with "      ...  - listItemName" and follows a "Level N-1" list item.
 
 Ordered Lists:
    Level 0: Text lines that start with "N. List Item" (where N is any positive whole number).
    Level 1: Text lines that starts with "   N. List Item" and follows a "Level 0" list item.
    Level 2: Text lines that starts with "      N. List Item" and follows a "Level 1" list item.
    Level 3: Text lines that starts with "         N. List Item" and follows a "Level 2" list item.
    ...
    Level N: Text lines that starts with "         ...   N. List Item" and follows a "Level N-1" 
             list item.
    
 Emedded Images:
    ![altText](someImageAddress)
    
 [END]
*/

$("document").ready(() => {

    const setAttr = (target, attrName, newAttrVal) => {
        $(target).attr(attrName, newAttrVal);
    }

    const setProperty = (target, propName, newPropVal) => {
        $(target).css(propName, newPropVal);
    }
    const applyClasses = (target, newClasses = "") => {
        setAttr(target, "class", newClasses);
    }

    const setupAppWindows = () => {

        const updateBlockquotes = () => {
            applyClasses(
                "blockquote",
                "blockquote"
            )
        }
        const updateImages = () => {
            applyClasses(
                "img",
                "img-thumbnail rounded d-block mx-auto text-dark"
            )
            setProperty("img", "max-width", "80%");
        };
        const updateTables = () => {
            applyClasses("table", "table table-striped table-light");
        };
        const updatePreview = () => {

            marked.setOptions({ breaks: true })
            $("#preview").html(marked.parse($("#editor").val()));

            updateBlockquotes();
            updateImages();
            updateTables();

        };

        const setupAppWindow = (windowName, keyupCallback = {}) => {

            applyClasses(`#` + windowName + "-window", "window bg-dark rounded");
            applyClasses(`#` + windowName + "-header", "bg-primary text-light rounded");
            applyClasses(`#` + windowName, "bg-dark text-light");

            if (keyupCallback !== {})
                $("#".concat(windowName)).keyup(keyupCallback);
        }

        const getInitialEditorText = () => {

            return (
                "# Top Level Heading\r" +
                "---\r" +

                "![Nature](https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Shaqi_jrvej.jpg/1200px-Shaqi_jrvej.jpg)\r" +

                "## Section 1 Heading\r" +

                '- This is a level 0 unordered list\r' +
                `  - This is a level 1 unordered list\r` +
                `    - This is a level 2 unordered list\r` +
                `      - This is a level 3 unordered list\r` +
                `      - [END]\r` +
                `    - [END]\r` +
                `  - [END]\r` +
                '- This is bolded text: **some_text**\r' +
                '- This is a link: [someLink](#)\r' +
                '- [END]\r' +

                "## Section 2 Heading\r" +

                '1. This is a level 0 ordered list\r' +
                `   1. This is a level 1 ordered list\r` +
                `      1. This is a level 2 ordered list\r` +
                `         1. This is a level 3 ordered list\r` +
                `         5. [END]\r` +
                `      7. [END]\r` +
                `   8. [END]\r` +
                '4. This is a blockquote: \r' +
                '> Blockquote\r' +
                '4. [END]\r' +

                "## Section 3 Heading\r" +

                '- This is inline code: `<div></div>` \r' +
                '- This is multi-line code: \r' +
                " ```\r" +
                "function printMessage() {\r   console.log(\"Hello World\"); \r}\r" +
                " ```\r" +
                '- [END]\n' +

                "## END"
            );

        };
        const setInitialEditorText = () => {
            $("#editor").val(getInitialEditorText());
            updatePreview();
        };



        applyClasses("#app-windows", "");
        setupAppWindow("preview");
        setupAppWindow("editor", updatePreview);
        setInitialEditorText();

    }



    setupAppWindows();

});