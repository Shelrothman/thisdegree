-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Actor" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "character" TEXT NOT NULL DEFAULT ''
);
INSERT INTO "new_Actor" ("id", "name") SELECT "id", "name" FROM "Actor";
DROP TABLE "Actor";
ALTER TABLE "new_Actor" RENAME TO "Actor";
CREATE UNIQUE INDEX "Actor_id_key" ON "Actor"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
