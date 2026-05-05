import { Router } from 'express';
import prisma from '../lib/prisma';

const router = Router();

// GET all news articles
router.get('/', async (req, res) => {
  try {
    const { published } = req.query;
    
    const where = published === 'true' ? { isPublished: true } : {};
    
    const news = await prisma.newsArticle.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    });
    res.json(news);
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET single news article by ID or slug
router.get('/:idOrSlug', async (req, res) => {
  try {
    const { idOrSlug } = req.params;
    
    // Try to find by ID first, then by slug
    let article = await prisma.newsArticle.findUnique({
      where: { id: idOrSlug }
    });
    
    if (!article) {
      article = await prisma.newsArticle.findUnique({
        where: { slug: idOrSlug }
      });
    }
    
    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }
    res.json(article);
  } catch (error) {
    console.error('Error fetching news article:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST create news article
router.post('/', async (req, res) => {
  try {
    const { 
      title, slug, content, excerpt,
      imageUrl, image_url, 
      category,
      isPublished, is_published
    } = req.body;
    
    const newArticle = await prisma.newsArticle.create({
      data: {
        title,
        slug,
        content,
        excerpt: excerpt || null,
        imageUrl: imageUrl || image_url || null,
        category,
        isPublished: isPublished ?? is_published ?? false,
        publishedAt: (isPublished || is_published) ? new Date() : null
      }
    });
    res.status(201).json(newArticle);
  } catch (error) {
    console.error('Error creating news article:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// PUT update news article
router.put('/:id', async (req, res) => {
  try {
    const { 
      title, slug, content, excerpt,
      imageUrl, image_url, 
      category,
      isPublished, is_published
    } = req.body;
    
    const updatedArticle = await prisma.newsArticle.update({
      where: { id: req.params.id },
      data: {
        title,
        slug,
        content,
        excerpt,
        imageUrl: imageUrl || image_url,
        category,
        isPublished: isPublished ?? is_published,
        publishedAt: (isPublished || is_published) ? new Date() : null
      }
    });
    res.json(updatedArticle);
  } catch (error) {
    console.error('Error updating news article:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE news article
router.delete('/:id', async (req, res) => {
  try {
    await prisma.newsArticle.delete({
      where: { id: req.params.id }
    });
    res.status(204).end();
  } catch (error) {
    console.error('Error deleting news article:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
