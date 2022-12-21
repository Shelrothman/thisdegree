/*
  Warnings:

  - You are about to drop the `Bridge` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ActorToMovie` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_BridgeToTree` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "Bridge_id_key";

-- DropIndex
DROP INDEX "_ActorToMovie_B_index";

-- DropIndex
DROP INDEX "_ActorToMovie_AB_unique";

-- DropIndex
DROP INDEX "_BridgeToTree_B_index";

-- DropIndex
DROP INDEX "_BridgeToTree_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Bridge";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_ActorToMovie";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_BridgeToTree";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Movie" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT NOT NULL,
    "castList" TEXT NOT NULL DEFAULT '[]'
);
INSERT INTO "new_Movie" ("createdAt", "id", "title") SELECT "createdAt", "id", "title" FROM "Movie";
DROP TABLE "Movie";
ALTER TABLE "new_Movie" RENAME TO "Movie";
CREATE UNIQUE INDEX "Movie_id_key" ON "Movie"("id");
CREATE TABLE "new_Tree" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "treeDeclaration" TEXT NOT NULL DEFAULT '[]',
    "postedById" TEXT,
    CONSTRAINT "Tree_postedById_fkey" FOREIGN KEY ("postedById") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Tree" ("createdAt", "id", "postedById") SELECT "createdAt", "id", "postedById" FROM "Tree";
DROP TABLE "Tree";
ALTER TABLE "new_Tree" RENAME TO "Tree";
CREATE UNIQUE INDEX "Tree_id_key" ON "Tree"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
