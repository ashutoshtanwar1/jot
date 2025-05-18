import type { ExplorerNode } from './explorer-context';

export const explorerTemplates: ExplorerNode[] = [
  {
    id: 'template-1',
    name: 'Daily Journal',
    isFolder: false,
    items: [],
    content: `
            <h1>Daily Journal</h1>
            <p><strong>Date:</strong> <span class="placeholder-text">[Enter Date Here, e.g., May 18, 2025]</span></p>
            <h2>How are you feeling today?</h2>
            <p class="placeholder-text">Describe your overall mood, energy levels, etc.</p>
            <h2>What are you grateful for today?</h2>
            <ul>
                <li><span class="placeholder-text">Gratitude point 1...</span></li>
                <li><span class="placeholder-text">Gratitude point 2...</span></li>
                <li><span class="placeholder-text">Gratitude point 3...</span></li>
            </ul>
            <h2>Today's Highlights &amp; Reflections:</h2>
            <p class="placeholder-text">What went well? What could have been better? Any notable events?</p>
            <h2>Goals for Tomorrow:</h2>
            <p class="placeholder-text">What do you want to achieve tomorrow?</p>
        `,
  },
  {
    id: 'template-2',
    name: 'To-Do List',
    isFolder: false,
    items: [],
    content: `
            <h1>My Tasks</h1>
            <p><em>Tip: TipTap handles checkboxes in task lists. Add new items using the editor.</em></p>
            <ul data-type="taskList">
                <li data-checked="false" data-type="taskItem"><label><input type="checkbox"><span></span></label><div>Finish project proposal</div></li>
                <li data-checked="true" data-type="taskItem"><label><input type="checkbox" checked><span></span></label><div>Schedule team meeting</div></li>
                <li data-checked="false" data-type="taskItem"><label><input type="checkbox"><span></span></label><div>Reply to important emails</div></li>
                <li data-checked="false" data-type="taskItem"><label><input type="checkbox"><span></span></label><div><span class="placeholder-text">New task...</span></div></li>
            </ul>
        `,
  },
  {
    id: 'template-3',
    name: 'Grocery List',
    isFolder: false,
    items: [],
    content: `
            <h1>Grocery Run</h1>
            <h3>Produce</h3>
            <ul data-type="taskList">
                <li data-checked="false" data-type="taskItem"><label><input type="checkbox"><span></span></label><div>Apples</div></li>
                <li data-checked="true" data-type="taskItem"><label><input type="checkbox" checked><span></span></label><div>Bananas</div></li>
                <li data-checked="false" data-type="taskItem"><label><input type="checkbox"><span></span></label><div>Spinach</div></li>
            </ul>
            <h3>Dairy &amp; Alternatives</h3>
            <ul data-type="taskList">
                <li data-checked="false" data-type="taskItem"><label><input type="checkbox"><span></span></label><div>Milk (Oat)</div></li>
                <li data-checked="false" data-type="taskItem"><label><input type="checkbox"><span></span></label><div>Yogurt</div></li>
            </ul>
            <h3>Pantry</h3>
            <ul data-type="taskList">
                <li data-checked="false" data-type="taskItem"><label><input type="checkbox"><span></span></label><div>Pasta</div></li>
                <li data-checked="false" data-type="taskItem"><label><input type="checkbox"><span></span></label><div>Rice</div></li>
            </ul>
        `,
  },
  {
    id: 'template-4',
    name: 'Habit Tracker',
    isFolder: false,
    items: [],
    content: `
            <h1>Habit Tracker</h1>
            <p><strong>Week of:</strong> <span class="placeholder-text">[Enter Start Date, e.g., May 19, 2025]</span></p>
            <table>
                <thead>
                    <tr>
                        <th>Habit</th>
                        <th>Mon</th>
                        <th>Tue</th>
                        <th>Wed</th>
                        <th>Thu</th>
                        <th>Fri</th>
                        <th>Sat</th>
                        <th>Sun</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Exercise (30 mins)</td>
                        <td><span class="placeholder-text">✓/X</span></td>
                        <td><span class="placeholder-text">✓/X</span></td>
                        <td><span class="placeholder-text">✓/X</span></td>
                        <td><span class="placeholder-text">✓/X</span></td>
                        <td><span class="placeholder-text">✓/X</span></td>
                        <td><span class="placeholder-text">✓/X</span></td>
                        <td><span class="placeholder-text">✓/X</span></td>
                    </tr>
                    <tr>
                        <td>Read (15 mins)</td>
                        <td><span class="placeholder-text">✓/X</span></td>
                        <td><span class="placeholder-text">✓/X</span></td>
                        <td><span class="placeholder-text">✓/X</span></td>
                        <td><span class="placeholder-text">✓/X</span></td>
                        <td><span class="placeholder-text">✓/X</span></td>
                        <td><span class="placeholder-text">✓/X</span></td>
                        <td><span class="placeholder-text">✓/X</span></td>
                    </tr>
                    <tr>
                        <td>Meditate (10 mins)</td>
                        <td><span class="placeholder-text">✓/X</span></td>
                        <td><span class="placeholder-text">✓/X</span></td>
                        <td><span class="placeholder-text">✓/X</span></td>
                        <td><span class="placeholder-text">✓/X</span></td>
                        <td><span class="placeholder-text">✓/X</span></td>
                        <td><span class="placeholder-text">✓/X</span></td>
                        <td><span class="placeholder-text">✓/X</span></td>
                    </tr>
                    <tr>
                        <td><span class="placeholder-text">New Habit...</span></td>
                        <td> </td> <td> </td> <td> </td> <td> </td> <td> </td> <td> </td> <td> </td>
                    </tr>
                </tbody>
            </table>
            <p><em>Tip: Use symbols like ✓, ✔, X, or fill cell backgrounds.</em></p>
        `,
  },
  {
    id: 'template-5',
    name: 'Meeting Notes',
    isFolder: false,
    items: [],
    content: `
            <h1>Meeting Notes</h1>
            <p><strong>Meeting Title:</strong> <span class="placeholder-text">Q3 Project Kickoff</span></p>
            <p><strong>Date &amp; Time:</strong> <span class="placeholder-text">May 18, 2025, 10:00 AM</span></p>
            <h3>Attendees:</h3>
            <p class="placeholder-text">Alice, Bob, Charlie</p>
            <h3>Agenda / Key Topics:</h3>
            <ol>
                <li><span class="placeholder-text">Topic A discussion</span></li>
                <li><span class="placeholder-text">Topic B planning</span></li>
                <li><span class="placeholder-text">Q&A</span></li>
            </ol>
            <h3>Discussion &amp; Notes:</h3>
            <p class="placeholder-text">Detailed notes from the discussion...</p>
            <h3>Action Items:</h3>
            <ul data-type="taskList">
                <li data-checked="false" data-type="taskItem"><label><input type="checkbox"><span></span></label><div><span class="placeholder-text">Action Item 1 (Assigned to: Person A)</span></div></li>
                <li data-checked="false" data-type="taskItem"><label><input type="checkbox"><span></span></label><div><span class="placeholder-text">Action Item 2 (Assigned to: Person B, Due: Date)</span></div></li>
            </ul>
            <h3>Decisions Made:</h3>
            <p class="placeholder-text">Key decisions reached during the meeting.</p>
        `,
  },
  {
    id: 'template-6',
    name: 'Project Planner',
    isFolder: false,
    items: [],
    content: `
            <h1>Project: <span class="placeholder-text">[Project Name]</span></h1>
            <p><strong>Deadline:</strong> <span class="placeholder-text">[Date]</span></p>
            <h2>Overall Goal:</h2>
            <p class="placeholder-text">Clearly define the main objective of this project.</p>
            <h2>Key Milestones:</h2>
            <ol>
                <li><span class="placeholder-text">Milestone 1 (Target Date: [Date])</span></li>
                <li><span class="placeholder-text">Milestone 2 (Target Date: [Date])</span></li>
                <li><span class="placeholder-text">Milestone 3 (Target Date: [Date])</span></li>
            </ol>
            <h2>Tasks Breakdown:</h2>
            <h3>Phase 1: <span class="placeholder-text">[Name]</span></h3>
            <ul data-type="taskList">
                <li data-checked="false" data-type="taskItem"><label><input type="checkbox"><span></span></label><div><span class="placeholder-text">Task 1.1</span></div></li>
                <li data-checked="false" data-type="taskItem"><label><input type="checkbox"><span></span></label><div><span class="placeholder-text">Task 1.2</span></div></li>
            </ul>
            <h3>Phase 2: <span class="placeholder-text">[Name]</span></h3>
            <ul data-type="taskList">
                <li data-checked="false" data-type="taskItem"><label><input type="checkbox"><span></span></label><div><span class="placeholder-text">Task 2.1</span></div></li>
                <li data-checked="false" data-type="taskItem"><label><input type="checkbox"><span></span></label><div><span class="placeholder-text">Task 2.2</span></div></li>
            </ul>
            <h2>Resources &amp; Links:</h2>
            <ul>
                <li><a href="#"><span class="placeholder-text">Link to relevant document/site</span></a></li>
                <li><span class="placeholder-text">Contact: Person X (email@example.com)</span></li>
            </ul>
            <h2>Notes &amp; Blockers:</h2>
            <p class="placeholder-text">Any potential issues or important notes.</p>
        `,
  },
  {
    id: 'template-7',
    name: 'Book Notes',
    isFolder: false,
    items: [],
    content: `
            <h1>Book Notes: <span class="placeholder-text">[Book Title]</span></h1>
            <p><strong>Author:</strong> <span class="placeholder-text">[Author Name]</span></p>
            <p><strong>Date Started:</strong> <span class="placeholder-text">[Date]</span> | <strong>Date Finished:</strong> <span class="placeholder-text">[Date]</span></p>
            <p><strong>My Rating:</strong> <span class="placeholder-text">[e.g., ★★★★☆]</span></p>
            <h2>Brief Summary:</h2>
            <p class="placeholder-text">A concise overview of the book's main plot or theme.</p>
            <h2>Key Takeaways / Insights:</h2>
            <ul>
                <li><span class="placeholder-text">Insight 1...</span></li>
                <li><span class="placeholder-text">Insight 2...</span></li>
                <li><span class="placeholder-text">Insight 3...</span></li>
            </ul>
            <h2>Memorable Quotes:</h2>
            <blockquote>
                <p class="placeholder-text">"The first quote that stood out..." (Page X)</p>
            </blockquote>
            <blockquote>
                <p class="placeholder-text">"Another impactful quote..." (Page Y)</p>
            </blockquote>
            <h2>Characters / Key People:</h2>
            <p class="placeholder-text">Brief notes on main characters or influential figures mentioned.</p>
            <h2>Personal Reflections:</h2>
            <p class="placeholder-text">How did the book make you feel? Did it change your perspective?</p>
        `,
  },
  {
    id: 'template-8',
    name: 'Recipe Card',
    isFolder: false,
    items: [],
    content: `
            <h1>Recipe: <span class="placeholder-text">[Dish Name]</span></h1>
            <p><strong>Source:</strong> <span class="placeholder-text">[e.g., Grandma's Kitchen, Website URL]</span></p>
            <p><strong>Prep Time:</strong> <span class="placeholder-text">20 mins</span> | <strong>Cook Time:</strong> <span class="placeholder-text">40 mins</span> | <strong>Servings:</strong> <span class="placeholder-text">4</span></p>
            <h2>Description:</h2>
            <p class="placeholder-text">A short, enticing description of the dish.</p>
            <h2>Ingredients:</h2>
            <ul data-type="taskList">
                <li data-checked="false" data-type="taskItem"><label><input type="checkbox"><span></span></label><div><span class="placeholder-text">1 cup Flour</span></div></li>
                <li data-checked="false" data-type="taskItem"><label><input type="checkbox"><span></span></label><div><span class="placeholder-text">2 Eggs</span></div></li>
                <li data-checked="false" data-type="taskItem"><label><input type="checkbox"><span></span></label><div><span class="placeholder-text">1/2 tsp Salt</span></div></li>
            </ul>
            <h2>Equipment:</h2>
            <ul>
                <li><span class="placeholder-text">Large mixing bowl</span></li>
                <li><span class="placeholder-text">9x13 inch baking pan</span></li>
            </ul>
            <h2>Instructions:</h2>
            <ol>
                <li><span class="placeholder-text">Preheat oven to 350°F (175°C).</span></li>
                <li><span class="placeholder-text">Combine dry ingredients in the mixing bowl.</span></li>
                <li><span class="placeholder-text">Add wet ingredients and mix until smooth.</span></li>
                <li><span class="placeholder-text">Pour into baking pan and bake for 40 minutes.</span></li>
            </ol>
            <h2>Notes / Tips:</h2>
            <p class="placeholder-text">Any variations, storage instructions, or serving suggestions.</p>
        `,
  },
  {
    id: 'template-9',
    name: 'SWOT Analysis',
    isFolder: false,
    items: [],
    content: `
            <h1>SWOT Analysis: <span class="placeholder-text">[Subject of Analysis, e.g., New Product Idea]</span></h1>
            <p><strong>Date:</strong> <span class="placeholder-text">[Date]</span></p>
            <table>
                <thead>
                    <tr>
                        <th style="width:50%;">Strengths</th>
                        <th style="width:50%;">Weaknesses</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <ul>
                                <li><span class="placeholder-text">Internal positive factor 1...</span></li>
                                <li><span class="placeholder-text">Internal positive factor 2...</span></li>
                            </ul>
                        </td>
                        <td>
                            <ul>
                                <li><span class="placeholder-text">Internal negative factor 1...</span></li>
                                <li><span class="placeholder-text">Internal negative factor 2...</span></li>
                            </ul>
                        </td>
                    </tr>
                </tbody>
                <thead>
                    <tr>
                        <th>Opportunities</th>
                        <th>Threats</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <ul>
                                <li><span class="placeholder-text">External positive factor 1...</span></li>
                                <li><span class="placeholder-text">External positive factor 2...</span></li>
                            </ul>
                        </td>
                        <td>
                            <ul>
                                <li><span class="placeholder-text">External negative factor 1...</span></li>
                                <li><span class="placeholder-text">External negative factor 2...</span></li>
                            </ul>
                        </td>
                    </tr>
                </tbody>
            </table>
            <h2>Summary &amp; Action Plan:</h2>
            <p class="placeholder-text">Based on the SWOT, what are the key strategies or actions to take?</p>
        `,
  },
  {
    id: 'template-10',
    name: 'Cornell Notes',
    isFolder: false,
    items: [],
    content: `
            <h1>Cornell Notes</h1>
            <p><strong>Topic:</strong> <span class="placeholder-text">[Main Topic/Lecture Title]</span></p>
            <p><strong>Date:</strong> <span class="placeholder-text">[Date]</span></p>
            <table>
                <thead>
                    <tr>
                        <th style="width:30%;">Cues / Questions</th>
                        <th style="width:70%;">Main Notes</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="vertical-align: top;">
                            <p class="placeholder-text"><em>After taking notes, formulate questions here.</em></p>
                            <br><p class="placeholder-text">What is...?</p>
                            <br><p class="placeholder-text">How does...?</p>
                            <br><p class="placeholder-text">Why is... important?</p>
                        </td>
                        <td style="vertical-align: top;">
                            <p class="placeholder-text">Main ideas, details, diagrams, examples from lecture/reading...</p>
                            <ul>
                                <li><span class="placeholder-text">Key point 1</span>
                                    <ul><li><span class="placeholder-text">Sub-point 1.1</span></li></ul>
                                </li>
                                <li><span class="placeholder-text">Key point 2</span></li>
                                <li><span class="placeholder-text">Important term: Definition</span></li>
                            </ul>
                            <p class="placeholder-text">Continue notes here...</p>
                        </td>
                    </tr>
                </tbody>
            </table>
            <hr>
            <h2>Summary:</h2>
            <p class="placeholder-text"><em>After the lecture/reading, summarize the main points from the notes section in 5-7 sentences.</em></p>
        `,
  },
];
