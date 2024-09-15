import fs from 'fs';
import path from 'path';



export const clearFolder = (folderPath) => {
    if (fs.existsSync(folderPath)) {
        // Read all items in the folder
        fs.readdirSync(folderPath).forEach((file) => {
            const curPath = path.join(folderPath, file);

            if (fs.lstatSync(curPath).isDirectory()) {
                // Recursively clear subdirectories
                clearFolder(curPath);
            } else {
                // Delete file
                fs.unlinkSync(curPath);
            }
        });
    } else {
        console.error('Folder to clear does not exist:', folderPath);
    }
};