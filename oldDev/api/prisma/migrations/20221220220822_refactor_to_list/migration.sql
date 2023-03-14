/*
    Warnings:

    - You are about to drop the column `treeDeclaration` on the `Tree` table. All the data in the column will be lost.
    - You are about to drop the column `castList` on the `Movie` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "Bridge" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "actorId" TEXT NOT NULL,
    "movieId" TEXT NOT NULL,
    CONSTRAINT "Bridge_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "Actor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Bridge_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_ActorToMovie" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_ActorToMovie_A_fkey" FOREIGN KEY ("A") REFERENCES "Actor" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ActorToMovie_B_fkey" FOREIGN KEY ("B") REFERENCES "Movie" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_BridgeToTree" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_BridgeToTree_A_fkey" FOREIGN KEY ("A") REFERENCES "Bridge" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_BridgeToTree_B_fkey" FOREIGN KEY ("B") REFERENCES "Tree" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Tree" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "postedById" TEXT,
    CONSTRAINT "Tree_postedById_fkey" FOREIGN KEY ("postedById") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Tree" ("createdAt", "id", "postedById") SELECT "createdAt", "id", "postedById" FROM "Tree";
DROP TABLE "Tree";
ALTER TABLE "new_Tree" RENAME TO "Tree";
CREATE UNIQUE INDEX "Tree_id_key" ON "Tree"("id");
CREATE TABLE "new_Movie" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT NOT NULL
);
INSERT INTO "new_Movie" ("createdAt", "id", "title") SELECT "createdAt", "id", "title" FROM "Movie";
DROP TABLE "Movie";
ALTER TABLE "new_Movie" RENAME TO "Movie";
CREATE UNIQUE INDEX "Movie_id_key" ON "Movie"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Bridge_id_key" ON "Bridge"("id");

-- CreateIndex
CREATE UNIQUE INDEX "_ActorToMovie_AB_unique" ON "_ActorToMovie"("A", "B");

-- CreateIndex
CREATE INDEX "_ActorToMovie_B_index" ON "_ActorToMovie"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_BridgeToTree_AB_unique" ON "_BridgeToTree"("A", "B");

-- CreateIndex
CREATE INDEX "_BridgeToTree_B_index" ON "_BridgeToTree"("B");
