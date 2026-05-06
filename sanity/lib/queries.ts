import { getClient } from "./client";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface SanityProject {
  _id: string;
  title: string;
  slug: { current: string };
  category: string;
  tags: string[];
  excerpt: string;
  coverImage: { asset: { _ref: string } };
  year: string;
  client?: string;
  url?: string;
  featured: boolean;
}

export interface SanityPost {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  coverImage: { asset: { _ref: string } };
  publishedAt: string;
  category: string;
  readingTime: number;
  author: {
    name: string;
    avatar: { asset: { _ref: string } };
  };
}

export interface SanityTestimonial {
  _id: string;
  name: string;
  role: string;
  company: string;
  text: string;
  rating: number;
  avatar?: { asset: { _ref: string } };
  projectRef?: { title: string };
}

export interface SanityTeamMember {
  _id: string;
  name: string;
  role: string;
  bio: string;
  avatar?: { asset: { _ref: string } };
  order: number;
  socials?: { linkedin?: string; twitter?: string };
}

export interface SanityService {
  _id: string;
  title: string;
  slug: { current: string };
  icon: string;
  description: string;
  longDescription: string;
  tags: string[];
  color: string;
  order: number;
}

// ─── Queries ─────────────────────────────────────────────────────────────────

export async function getProjects(filter?: string): Promise<SanityProject[]> {
  const filterClause = filter && filter !== "all"
    ? `&& "${filter}" in tags`
    : "";
  return getClient().fetch(
    `*[_type == "project" ${filterClause}] | order(featured desc, year desc) {
      _id, title, slug, category, tags, excerpt, coverImage, year, client, url, featured
    }`
  );
}

export async function getProjectBySlug(slug: string): Promise<SanityProject | null> {
  return getClient().fetch(
    `*[_type == "project" && slug.current == $slug][0]`,
    { slug }
  );
}

export async function getFeaturedProjects(): Promise<SanityProject[]> {
  return getClient().fetch(
    `*[_type == "project" && featured == true] | order(year desc)[0...6] {
      _id, title, slug, category, tags, excerpt, coverImage, year, client
    }`
  );
}

export async function getPosts(limit = 10): Promise<SanityPost[]> {
  return getClient().fetch(
    `*[_type == "post"] | order(publishedAt desc)[0...$limit] {
      _id, title, slug, excerpt, coverImage, publishedAt, category, readingTime,
      author->{ name, avatar }
    }`,
    { limit: limit - 1 }
  );
}

export async function getPostBySlug(slug: string): Promise<SanityPost & { body: unknown }> {
  return getClient().fetch(
    `*[_type == "post" && slug.current == $slug][0] {
      _id, title, slug, excerpt, coverImage, publishedAt, category, readingTime,
      body, author->{ name, bio, avatar }
    }`,
    { slug }
  );
}

export async function getTestimonials(): Promise<SanityTestimonial[]> {
  return getClient().fetch(
    `*[_type == "testimonial"] | order(_createdAt desc) {
      _id, name, role, company, text, rating, avatar, projectRef->{ title }
    }`
  );
}

export async function getTeam(): Promise<SanityTeamMember[]> {
  return getClient().fetch(
    `*[_type == "teamMember"] | order(order asc) {
      _id, name, role, bio, avatar, order, socials
    }`
  );
}

export async function getServices(): Promise<SanityService[]> {
  return getClient().fetch(
    `*[_type == "service"] | order(order asc) {
      _id, title, slug, icon, description, longDescription, tags, color, order
    }`
  );
}
