-- AlterTable
ALTER TABLE "user" ADD COLUMN     "address" TEXT,
ADD COLUMN     "address2" TEXT,
ADD COLUMN     "city" TEXT,
ADD COLUMN     "country" TEXT,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "postalCode" TEXT,
ADD COLUMN     "state" TEXT;

-- CreateTable
CREATE TABLE "dog" (
    "id" TEXT NOT NULL,
    "image" TEXT,
    "name" TEXT NOT NULL,
    "breed" TEXT,
    "age" INTEGER,
    "gender" TEXT,
    "color" TEXT,
    "weight" DOUBLE PRECISION,
    "size" TEXT NOT NULL,
    "neutered" BOOLEAN NOT NULL,
    "healthy" BOOLEAN NOT NULL,
    "vaccinated" BOOLEAN NOT NULL,
    "dewormed" BOOLEAN NOT NULL,
    "microchip" BOOLEAN NOT NULL,
    "allergies" TEXT,
    "sociable" BOOLEAN NOT NULL,
    "eatingHabits" TEXT,
    "ownerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "dog_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "dog" ADD CONSTRAINT "dog_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
