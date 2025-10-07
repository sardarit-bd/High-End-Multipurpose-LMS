"use client";

import { create } from "zustand";
import uid from "../utils/uid";

export const useCourseStore = create((set) => ({
  step: 1,
  setStep: (step) => set({ step }),

  course: {
    // step1
    title: "",
    category: "",
    level: "",
    language: "",
    maxStudents: "",
    publicPrivate: "Public",
    shortDescription: "",
    description: "",
    outcomes: [""],
    requirements: [""],
    featured: false,

    // step2
    thumbnailFile: null,
    thumbnailPreview: "",
    videoSource: "external",
    videoURL: "",

    // step3
    topics: [],

    // step4
    faqs: [],
    tags: [],
    messageToReviewer: "",
    licenseConfirmed: false,

    // step5
    pricing: {
      free: false,
      price: "",
      hasDiscount: false,
      discountPrice: "",
      expiry: "lifetime",
      months: "",
    },
  },

  updateCourse: (patch) =>
    set((s) => ({ course: { ...s.course, ...patch } })),


  setOutcome: (index, value) =>
    set((s) => {
      const outcomes = [...s.course.outcomes];
      outcomes[index] = value;
      return { course: { ...s.course, outcomes } };
    }),

  addOutcome: () =>
    set((s) => ({ course: { ...s.course, outcomes: [...s.course.outcomes, ""] } })),
  removeOutcome: (index) =>
    set((s) => ({ course: { ...s.course, outcomes: s.course.outcomes.filter((_, i) => i !== index) } })),

  setRequirement: (index, value) =>
    set((s) => {
      const requirements = [...s.course.requirements];
      requirements[index] = value;
      return { course: { ...s.course, requirements } };
    }),
  addRequirement: () =>
    set((s) => ({ course: { ...s.course, requirements: [...s.course.requirements, ""] } })),
  removeRequirement: (index) =>
    set((s) => ({ course: { ...s.course, requirements: s.course.requirements.filter((_, i) => i !== index) } })),

  // topics & lessons
  addTopic: (title) =>
    set((s) => ({
      course: {
        ...s.course,
        topics: [...s.course.topics, { id: uid("t_"), title, lessons: [] }],
      },
    })),
  deleteTopic: (id) =>
    set((s) => ({ course: { ...s.course, topics: s.course.topics.filter((t) => t.id !== id) } })),

  addLesson: (topicId, lesson) =>
    set((s) => ({
      course: {
        ...s.course,
        topics: s.course.topics.map((t) => (t.id === topicId ? { ...t, lessons: [...t.lessons, { id: uid("l_"), ...lesson }] } : t)),
      },
    })),

  deleteLesson: (topicId, lessonId) =>
    set((s) => ({
      course: {
        ...s.course,
        topics: s.course.topics.map((t) => (t.id === topicId ? { ...t, lessons: t.lessons.filter((l) => l.id !== lessonId) } : t)),
      },
    })),

  // faq / tags
  addFaq: (q, a) =>
    set((s) => ({ course: { ...s.course, faqs: [...s.course.faqs, { id: uid("f_"), q, a }] } })),
  deleteFaq: (id) =>
    set((s) => ({ course: { ...s.course, faqs: s.course.faqs.filter((f) => f.id !== id) } })),

  addTag: (t) =>
    set((s) => {
      if (!t) return {};
      if (s.course.tags.includes(t)) return {};
      return { course: { ...s.course, tags: [...s.course.tags, t] } };
    }),
  removeTag: (t) =>
    set((s) => ({ course: { ...s.course, tags: s.course.tags.filter((x) => x !== t) } })),

  // pricing
  updatePricing: (patch) =>
    set((s) => ({ course: { ...s.course, pricing: { ...s.course.pricing, ...patch } } })),

  // thumbnail helper
  setThumbnail: (file, preview) => set((s) => ({ course: { ...s.course, thumbnailFile: file, thumbnailPreview: preview } })),
}));
