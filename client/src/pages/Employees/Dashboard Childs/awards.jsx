import { useState } from "react"

export const EmployeeAwards = () => {
    const [selectedCategory, setSelectedCategory] = useState("all")

    // Mock data for awards
    const awards = [
        {
            id: 1,
            title: "Employee of the Month",
            category: "recognition",
            date: "March 2024",
            description: "Outstanding performance and dedication to the team",
            icon: "🏆",
        },
        {
            id: 2,
            title: "Perfect Attendance",
            category: "achievement",
            date: "Q1 2024",
            description: "No absences or late arrivals for the entire quarter",
            icon: "⭐",
        },
        {
            id: 3,
            title: "Innovation Award",
            category: "project",
            date: "February 2024",
            description: "Implemented a new process that improved efficiency by 30%",
            icon: "💡",
        },
        {
            id: 4,
            title: "Team Player",
            category: "recognition",
            date: "January 2024",
            description: "Exceptional collaboration and support to team members",
            icon: "🤝",
        },
    ]

    // Mock data for upcoming opportunities
    const opportunities = [
        {
            title: "Leadership Development Program",
            deadline: "April 15, 2024",
            description: "Apply for the next cohort of our leadership program",
        },
        {
            title: "Innovation Challenge",
            deadline: "May 1, 2024",
            description: "Submit your innovative ideas for company improvement",
        },
    ]

    const categories = [
        { id: "all", name: "All Awards" },
        { id: "recognition", name: "Recognition" },
        { id: "achievement", name: "Achievements" },
        { id: "project", name: "Project Awards" },
    ]

    const filteredAwards = selectedCategory === "all"
        ? awards
        : awards.filter(award => award.category === selectedCategory)

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">Awards & Recognition</h1>

            {/* Category Filter */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex flex-wrap gap-2">
                    {categories.map(category => (
                        <button
                            key={category.id}
                            onClick={() => setSelectedCategory(category.id)}
                            className={`px-4 py-2 rounded-lg transition-all ${
                                selectedCategory === category.id
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-100 hover:bg-gray-200"
                            }`}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Awards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredAwards.map(award => (
                    <div key={award.id} className="bg-white p-6 rounded-lg shadow-md">
                        <div className="flex items-start justify-between">
                            <div>
                                <div className="text-4xl mb-2">{award.icon}</div>
                                <h3 className="text-xl font-bold">{award.title}</h3>
                                <p className="text-sm text-gray-500 mt-1">{award.date}</p>
                            </div>
                            <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm capitalize">
                                {award.category}
                            </span>
                        </div>
                        <p className="mt-4 text-gray-600">{award.description}</p>
                    </div>
                ))}
            </div>

            {/* Upcoming Opportunities */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-4">Upcoming Opportunities</h2>
                <div className="space-y-4">
                    {opportunities.map((opportunity, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div>
                                <div className="font-semibold">{opportunity.title}</div>
                                <div className="text-sm text-gray-600 mt-1">
                                    {opportunity.description}
                                </div>
                                <div className="text-sm text-gray-500 mt-1">
                                    Deadline: {opportunity.deadline}
                                </div>
                            </div>
                            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                                Apply
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Achievement Stats */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-4">Your Achievement Stats</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">{awards.length}</div>
                        <div className="text-sm text-gray-600">Total Awards</div>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">3</div>
                        <div className="text-sm text-gray-600">Recognition Awards</div>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600">1</div>
                        <div className="text-sm text-gray-600">Project Awards</div>
                    </div>
                </div>
            </div>
        </div>
    )
} 