const original=["Computer Software & Troubleshooting","Microsoft Word & Document Design","Microsoft Excel & Spreadsheets","Microsoft PowerPoint & Presentations","Ethical Hacking Foundations","Cybersecurity & Privacy","Coding Playground","Programming & Algorithms","Cloud Computing","Website Builder","Mobile App Planning","AI Video Production","Linux & Command-Line Basics","Networking Fundamentals","Databases & Data Skills","Git & GitHub Workflow","AI Prompt Engineering","UI/UX & Accessibility","APIs & Automation"];
const added=["Programming Fundamentals","Data Structures","Algorithms","Object-Oriented Programming","Functional Programming","Web Development","Frontend Development","Backend Development","Mobile App Development","Desktop Software Development","Database Systems","Operating Systems","Computer Architecture","Computer Networks","Cybersecurity","Ethical Hacking","Software Engineering","Version Control","Cloud Computing","DevOps and CI/CD","Artificial Intelligence","Machine Learning","Deep Learning","Data Science","Data Engineering","Computer Graphics","Game Development","Embedded Systems and IoT","Programming Languages and Compilers","Distributed Systems and Parallel Computing"];
const slug=s=>s.toLowerCase().replace(/&/g,'and').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const courses=[...original.map((title,i)=>({title,group:'Core Learning Lab',index:i+1})),...added.map((title,i)=>({title,group:'Computer Science & Coding',index:original.length+i+1}))].map(c=>({id:slug(c.title)+'-'+c.index,title:c.title,group:c.group,index:c.index,description:`Learn ${c.title.toLowerCase()} through guided lessons, examples, practice tasks, and review.`,practiceStatus:c.title==='Website Builder'?'Basic HTML preview available':'Subject-specific checker/runtime requires implementation or setup'}));
const categories=[
['languages','Programming Languages & Runtimes','Python, C, C++, C#, Java, Kotlin, JavaScript, TypeScript, Go, Rust, PHP, Ruby, Swift, Dart, Lua, R, SQL, Bash, PowerShell, HTML, CSS, Assembly.','Requires setup'],
['editor','Code Editor & Project Workspace','Text editor, project files, search, and saved practice work.','Basic editor'],
['web','Web Development','HTML/CSS/JavaScript editing and isolated HTML preview.','Basic HTML preview available'],
['backend','Backend & Server Development','API routes, validation, request handling, and server architecture.','Requires setup'],
['testing','Testing, Debugging & Code Quality','Error review, test concepts, linters, and diagnostics.','Partial'],
['data','Databases & Data','SQL concepts, JSON/CSV exercises, and data transformations.','Partial'],
['apis','APIs & Automation','Request/response concepts, safe API testing, regex, and workflows.','Requires setup'],
['git','Git, GitHub & Collaboration','Diffs, commits, branches, and collaboration workflows.','Learning exercises'],
['linux','Linux & System Administration','Command-line lessons and safe simulations.','Simulation / setup required'],
['network','Networking','IP addressing, subnet concepts, DNS, HTTP, and topology exercises.','Learning exercises'],
['security','Cybersecurity & Privacy','Defensive security, privacy, and authorised labs.','Learning exercises'],
['aiml','AI & Machine Learning','Prompt practice, AI configuration, and model concepts.','Online AI setup required; offline model planned'],
['visualizers','Computer Science Visualizers','Sorting, graph traversal, data structures, and complexity.','Planned'],
['creative','App, Game & Graphics Development','App planning, game logic, graphics concepts, and SVG.','Partial'],
['productivity','Documents & Productivity','Markdown, document design, text comparison, and productivity.','Learning exercises'],
['devops','Cloud, Deployment & DevOps','Deployment configuration, cloud concepts, and CI/CD.','Requires setup']
].map(([id,title,description,status])=>({id,title,description,status,tools:description.split(/[,.]/).filter(Boolean).slice(0,6)}));
module.exports={courses,categories,original,added};
