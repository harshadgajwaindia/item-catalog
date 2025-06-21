-- CreateTable
CREATE TABLE "Form" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "coverImage" TEXT NOT NULL,
    "additionalImages" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Form_pkey" PRIMARY KEY ("id")
);
