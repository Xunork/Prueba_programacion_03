import zipfile
import xml.etree.ElementTree as ET
import sys

def read_docx(filename):
    try:
        with zipfile.ZipFile(filename) as d:
            xml_content = d.read('word/document.xml')
            tree = ET.fromstring(xml_content)
            ns = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
            paragraphs = tree.findall('.//w:p', ns)
            for p in paragraphs:
                texts = [node.text for node in p.findall('.//w:t', ns) if node.text]
                if texts:
                    print(''.join(texts))
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    read_docx(sys.argv[1])
