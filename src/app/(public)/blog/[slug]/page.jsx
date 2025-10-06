export default function BlogSingle() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Blog Header */}
      <div className="mb-10">
        <img
          src="/images/blog-2.jpg"
          alt="Blog Featured"
          className="rounded-lg w-full object-cover mb-6"
        />
        <div className="flex lg:flex-row flex-col lg:items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <img
              src="/images/student-1.jpg"
              alt="Author"
              className="w-8 h-8 rounded-full"
            />
            <span className="text-[var(--color-text)] font-semibold">John Miller</span>
          </div>
          <span className="flex items-center gap-1">
            📅 20 Apr 2024
          </span>
          <span className="flex items-center gap-1">
            🔖 Programming, Web Design
          </span>
        </div>
        <h1 className="lg:text-4xl text-2xl font-bold text-[var(--color-text)] mt-4">
          Learn Web App Development from Experts in 2024
        </h1>
      </div>

      {/* Blog Content */}
      <div className=" text-gray-700 leading-relaxed mb-12">
        <p>
          Web app development continues to be one of the most sought-after skills
          in the tech industry  From lucrative job opportunities to the chance to work on cutting-edge
          technologies, learning web app development opens doors.
        </p>
        <p>
            One of the key advantages of starting in 2024 is the availability of advanced tools, frameworks, and learning resources. Frameworks like React, Angular, and Vue.js have matured, making development more efficient and user-friendly. Additionally, the rise of online platforms and boot camps provides access to high-quality training, whether you're a beginner or an experienced programmer. The developer community is also thriving, with frequent conferences, virtual meetups, and forums that offer networking and collaborative opportunities.
        </p>
        <p>
            If you’re ready to embark on this exciting journey, now is the time to invest in your future. With expert mentorship, practical experience, and a commitment to continuous learning, you can unlock a world of opportunities in web app development in 2024 and beyond.
        </p>
      </div>

      {/* Author Bio */}
      <div className="flex items-center gap-4 p-6 bg-gray-50 rounded-lg shadow mb-10">
        <img
          src="/images/student-1.jpg"
          alt="Author"
          className="w-20 h-20 rounded-lg object-cover"
        />
        <div>
          <h3 className="font-semibold text-lg text-[var(--color-text)]">
            Robert Hollenbeck
          </h3>
          <p className="text-sm text-gray-600">
            Experienced project manager and consultant...
          </p>
        </div>
      </div>


      {/* Tags */}
      <div className="mb-10">
        <h4 className="font-semibold text-lg text-[var(--color-text)] mb-3">Latest Tags</h4>
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 bg-[var(--color-primary)]/10 text-[var(--color-primary)] text-sm rounded-full">
            HTML
          </span>
          <span className="px-3 py-1 bg-[var(--color-primary)]/10 text-[var(--color-primary)] text-sm rounded-full">
            Web Design
          </span>
          <span className="px-3 py-1 bg-[var(--color-primary)]/10 text-[var(--color-primary)] text-sm rounded-full">
            Programming
          </span>
        </div>
      </div>

      {/* Reviews */}
      <div className="mb-10">
        <h4 className="font-semibold text-lg text-[var(--color-text)] mb-4">Reviews</h4>

        {/* Review 1 */}
        <div className="p-4 border rounded-lg mb-4">
          <div className="flex items-center justify-between">
            <span className="font-medium text-[var(--color-text)]">Adrian Henriques</span>
          </div>
          <p className="text-gray-600 mt-2">
            I highly recommend to anyone looking to learn...
          </p>
        </div>

        {/* Review 2 with nested reply */}
        <div className="p-4 border rounded-lg">
          <div className="flex items-center justify-between">
            <span className="font-medium text-[var(--color-text)]">Adrian Henriques</span>
          </div>
          <p className="text-gray-600 mt-2">
            While I learned a lot from this course, I feel I could have used more practical examples...
          </p>
        </div>
      </div>

      {/* Comment Form */}
      <div className="p-6 border rounded-lg">
        <h4 className="font-semibold text-lg text-[var(--color-text)] mb-4">Leave a Comment</h4>
        <form className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-[var(--color-primary)]"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-[var(--color-primary)]"
            />
          </div>
          <textarea
            placeholder="Comment"
            rows={4}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-[var(--color-primary)]"
          ></textarea>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="save-info" className="h-4 w-4" />
            <label htmlFor="save-info" className="text-sm text-gray-600">
              Save my name & email in this browser for the next time I comment
            </label>
          </div>
          <button
            type="submit"
            className="bg-[var(--color-primary)] text-white px-6 py-2 rounded-lg hover:bg-[var(--color-primary-hover)] transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
