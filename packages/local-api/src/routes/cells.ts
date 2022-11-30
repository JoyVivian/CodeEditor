import express from "express";
import fs from "fs/promises";
import path from "path";

interface Cell {
    id: string;
    content: string;
    type: 'markdown' | 'code';
};

interface LocalApiError {
    code: string;
}

export const createCellsRouter = (filename: string, dir: string) => {
  const router = express.Router();
  const fullPath = path.join(dir, filename);
  
  router.use(express.json());

  router.get("/cells", async (req, res) => {
    // Make sure the file exists.
    // If it does not exist, create the file and add in default list of cells.
    // Read the file.
    // Parse a list of cells out of it.
    // Send list of cells back to browser.

    const isLocalApiError = (err: any): err is LocalApiError => {
        return typeof err.code === "string";
    };

    try {
        // Read the file.
        const result = await fs.readFile(fullPath, { encoding: 'utf-8'});
        
        // Parse the result and send it back.
        res.send(JSON.parse(result))
    } catch (err) {
        // If the file does not exist

        if (isLocalApiError(err)) {
            if (err.code === 'ENOENT') {
                // Add code to create a file and add default cells.
                await fs.writeFile(fullPath, '[]', 'utf-8');   
                res.send([]);
            }
        } else if (err instanceof Error) {
            // Re-throw errors.
            throw err;
        }
    }

   
  });

  router.post("/cells", async (req, res) => {
    // Make sure the file exists.
    // If not, create it.
    // Take the list of cells from the request object.
    // Serialize them.
    const { cells }: { cells: Cell[] } = req.body;

    // Write the cells into the file.
    
    await fs.writeFile(fullPath, JSON.stringify(cells), 'utf-8');

    res.send({ status: 'ok'});
  });

  return router;
};
