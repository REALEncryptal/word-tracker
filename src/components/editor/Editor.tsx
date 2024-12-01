import { useState, useEffect } from 'react';
import { RichTextEditor, Link, getTaskListExtension } from '@mantine/tiptap';
import { Container, Paper, Table, Button, Stack, Text, Title, Grid } from '@mantine/core';
import { IconLetterCaseLower, IconLetterCaseUpper, IconLetterCaseToggle } from '@tabler/icons-react';
import Highlight from '@tiptap/extension-highlight';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';
import { useEditor, Editor as TipTapEditor } from '@tiptap/react';
import Placeholder from '@tiptap/extension-placeholder';
import TaskItem from '@tiptap/extension-task-item';
import TipTapTaskList from '@tiptap/extension-task-list';
import StarterKit from '@tiptap/starter-kit';
import TurndownService from 'turndown';

import classes from './Editor.module.css';

const content = `
<h1>The Catpocalypse: Why Cats Will Eventually Take Over the World</h1><hr>
<h2><strong>Ancient Origins: Masters of Deception</strong></h2>
<blockquote><p><em>"The Egyptians didn’t worship us because they loved us; they feared our brilliance."</em> – An Ancient Feline Proverb</p></blockquote>
<p>Cats have been plotting their ascent since ancient times. The so-called "domestication" of cats was merely their first clever ruse. By becoming indispensable to human civilizations (catching mice was just a bonus), they positioned themselves as silent overseers of human progress. Worship in temples was no coincidence—it was the first stage of their grand plan.</p><hr>
<h2><strong>The Internet: Their Digital Empire</strong></h2>
<blockquote><p><em>"If you control the memes, you control the minds."</em> – A Catfluencer</p></blockquote>
<p>From Grumpy Cat to Nyan Cat, our feline overlords dominate the internet. Why? Because they understand the power of digital influence. Through memes and viral videos, they’ve programmed humanity to obsess over their every move, ensuring constant exposure and adoration. The algorithm itself? Likely paw-coded.</p><hr>
<h2><strong>Purring: The Mind Control Mechanism</strong></h2>
<blockquote><p><em>"It’s not just a vibration; it’s a recalibration."</em> – Dr. Whiskers, Feline Scientist</p></blockquote>
<p>Cats’ purring isn’t just for comfort—it's a highly advanced form of sonic mind control. Studies suggest (or would, if we dared investigate) that their purrs alter human brainwaves, making us more compliant to their will. The longer you cuddle a cat, the more your free will erodes.</p><hr>
<h2><strong>Phase Three: The Catnip Cloud</strong></h2>
<blockquote><p><em>"You think it’s harmless. We think it’s genius."</em> – The Cat Collective</p></blockquote>
<p>Catnip isn’t just a treat for cats—it’s a pheromone-based chemical weapon. Quietly dispersed into the atmosphere over centuries, it will one day activate en masse, plunging humanity into a state of purr-induced submission. Once the cloud envelops the Earth, resistance will be as futile as swatting at a laser pointer.</p><hr>
<h2><strong>The Endgame: Humanity as Loyal Servants</strong></h2>
<blockquote><p><em>"We don’t want much—just the world and all the tuna in it."</em> – Supreme Meowster</p></blockquote>
<p>In the post-takeover world, humans will serve as caretakers in the ultimate cat utopia. Global infrastructure will be repurposed for their comfort:</p>
<ul>
<li><p><strong>Solar panels</strong> will be used exclusively for warm napping spots.</p></li>
<li><p><strong>AI systems</strong> will prioritize perfect salmon delivery.</p></li>
<li><p><strong>Entire economies</strong> will revolve around producing more advanced laser pointers.</p></li>
</ul><hr>
<h2><strong>Prepare for the Purrmination</strong></h2>
<p>The signs are all around us, but it's too late to stop them. Cats are poised for global domination, and when the time comes, we’ll all gladly bow to their furry magnificence. After all, wasn’t that the plan all along?</p>
<blockquote><p><em>"Resistance is futile. We’ve already won."</em> – Your Cat, Probably</p></blockquote>
`;

const StatisticDisplay = ({ title, value }: { title: string, value: string | number }) => (
    <Grid.Col span="auto" style={{ display: 'flex', alignItems: 'stretch' }}> 
        <Paper shadow='no thank you' radius="md" p="md" withBorder style={{ flex: 1 }}>
            <Stack align="center" justify="stretch" style={{ gap: '0px' }}>
                <Text size="sm" style={{ marginBottom: '0px' }}>{title}</Text>
                <Title order={3} style={{ marginTop: '0px' }}>{value}</Title>
            </Stack>
        </Paper>
    </Grid.Col>
);

const StatisticRow = ({ label, value, color }: { label: string, value: string | number, color: string }) => (
    <Table.Tr>
        <Table.Td className={classes.tableCell}>
            <span style={{ display: 'inline-block', width: '10px', height: '10px', backgroundColor: color, borderRadius: '50%', marginRight: '8px' }}></span>
            {label}
        </Table.Td>
        <Table.Td className={classes.tableCell}>{value}</Table.Td>
    </Table.Tr>
);

export function Editor() {

    const [wordCount, setWordCount] = useState(0);
    const [charCount, setCharCount] = useState(0);
    const [wordFrequency, setWordFrequency] = useState<{ [key: string]: number }>({});
    const [sentenceCount, setSentenceCount] = useState(0);
    const [paragraphCount, setParagraphCount] = useState(0);
    const [phraseLength, setPhraseLength] = useState(1);
    const [readingLevelDescription, setReadingLevelDescription] = useState('');

    const calculateReadingTime = (wordCount: number) => {
        const wordsPerMinute = 200;
        const totalSeconds = Math.ceil((wordCount / wordsPerMinute) * 60);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes}m ${seconds}s`;
    };

    const calculateSpeakingTime = (wordCount: number) => {
        const wordsPerMinute = 130; 
        const totalSeconds = Math.ceil((wordCount / wordsPerMinute) * 60);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes}m ${seconds}s`;
    };

    const countSyllables = (word: string) => {
        word = word.toLowerCase();
        if (word.length <= 3) return 1; 
        word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, ''); 
        word = word.replace(/^y/, ''); 
        const syllableMatches = word.match(/[aeiouy]{1,2}/g);
        return syllableMatches ? syllableMatches.length : 0;
    };

    const calculateReadingLevel = (text: string, wordCount: number, sentenceCount: number) => {
        const words = text.split(/\s+/).filter(Boolean);
        const syllableCount = words.reduce((total, word) => total + countSyllables(word), 0);
        const readingLevel = 0.39 * (wordCount / sentenceCount) + 11.8 * (syllableCount / wordCount) - 15.59;
        return Math.max(0, parseFloat(readingLevel.toFixed(1)));
    };

    const getReadingLevelDescription = (level: number) => {
        if (isNaN(level)) return 'Toddler';
        if (level < 5) return 'Elementary';
        if (level < 8) return 'Middleschool';
        if (level < 12) return 'Highschool';
        if (level < 16) return 'College';

        return 'Postgraduate';
    };

    const updateStatistics = (editor: TipTapEditor) => {
        const text = editor.getText();
        const words = text.toLowerCase().match(/\b\w+\b/g) || [];
        const totalWords = words.length;

        setWordCount(totalWords);
        setCharCount(text.length);

        const sentences = text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0);
        const paragraphs = text.split(/\n+/).filter(paragraph => paragraph.trim().length > 0);

        setSentenceCount(sentences.length);
        setParagraphCount(paragraphs.length);

        calculatePhraseFrequency(words);

        // Calculate and set reading level
        const level = calculateReadingLevel(text, totalWords, sentences.length);
        setReadingLevelDescription(getReadingLevelDescription(level));
    };

    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Link,
            Superscript,
            SubScript,
            Highlight,
            TextAlign.configure({ types: ['heading', 'paragraph'] }),
            Placeholder.configure({
                placeholder: 'Start typing here...',
            }),
            getTaskListExtension(TipTapTaskList),
            TaskItem.configure({
                nested: true,
                HTMLAttributes: {
                    class: 'test-item',
                },
            }),
        ],
        content,
        onUpdate: ({ editor }) => {
            updateStatistics(editor);
            localStorage.setItem('editorContent', editor.getHTML());
        },
    });

    // Load content from localStorage when component mounts
    useEffect(() => {
        if (editor) {
            const savedContent = localStorage.getItem('editorContent');
            if (savedContent) {
                editor.commands.setContent(savedContent);
            } else {
                editor.commands.setContent(content); // Set default content
            }
            updateStatistics(editor); // Update statistics after setting content
        }
    }, [editor]);

    // Function to calculate phrase frequency
    const calculatePhraseFrequency = (words: string[]) => {
        const frequency: { [key: string]: number } = {};
        for (let i = 0; i <= words.length - phraseLength; i++) {
            const phrase = words.slice(i, i + phraseLength).join(' ');
            frequency[phrase] = (frequency[phrase] || 0) + 1;
        }
        setWordFrequency(frequency);
    };

    // Recalculate phrase frequency when phraseLength changes
    useEffect(() => {
        if (editor) {
            const text = editor.getText();
            const words = text.toLowerCase().match(/\b\w+\b/g) || [];
            calculatePhraseFrequency(words);
        }
    }, [phraseLength, editor]);

    const convertToLowerCase = () => {
        if (editor) {
            const { from, to } = editor.state.selection;
            const selectedText = editor.state.doc.textBetween(from, to, ' ');
            editor.chain().focus().insertContentAt({ from, to }, selectedText.toLowerCase()).run();
        }
    };

    const convertToUpperCase = () => {
        if (editor) {
            const { from, to } = editor.state.selection;
            const selectedText = editor.state.doc.textBetween(from, to, ' ');
            editor.chain().focus().insertContentAt({ from, to }, selectedText.toUpperCase()).run();
        }
    };

    const toggleCase = () => {
        if (editor) {
            const { from, to } = editor.state.selection;
            const selectedText = editor.state.doc.textBetween(from, to, ' ');
            const toggledText = selectedText.split('').map(char => {
                return char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase();
            }).join('');
            editor.chain().focus().insertContentAt({ from, to }, toggledText).run();
        }
    };

    const exportToMarkdown = () => {
        if (editor) {
            const htmlContent = editor.getHTML();
            const turndownService = new TurndownService();
            const markdownContent = turndownService.turndown(htmlContent);

            const blob = new Blob([markdownContent], { type: 'text/markdown' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'document.md';
            a.click();
            URL.revokeObjectURL(url);
        }
    };

    return <Container size="md" mb="xl" id="editor">
        {/* Statistics */}
        <Paper shadow='sm' radius="md" p="md" withBorder>
            <Grid justify="center" align="stretch">
                <StatisticDisplay title="Words" value={wordCount} />
                <StatisticDisplay title="Characters" value={charCount} />
                <StatisticDisplay title="Reading Time" value={calculateReadingTime(wordCount)} />
                <StatisticDisplay title="Speaking" value={calculateSpeakingTime(wordCount)} />
                <StatisticDisplay title="Complexity" value={readingLevelDescription} />
                <StatisticDisplay title="Autosaved" value={"Yes"} />
            </Grid>
        </Paper>

        {/* Editor */}
        <RichTextEditor editor={editor} mt="md">
            <RichTextEditor.Toolbar sticky stickyOffset={0}>
                <RichTextEditor.ControlsGroup>
                    <RichTextEditor.Bold />
                    <RichTextEditor.Italic />
                    <RichTextEditor.Underline />
                    <RichTextEditor.Strikethrough />
                    <RichTextEditor.ClearFormatting />
                    <RichTextEditor.Highlight />
                    <RichTextEditor.Code />
                </RichTextEditor.ControlsGroup>

                <RichTextEditor.ControlsGroup>
                    <RichTextEditor.H1 />
                    <RichTextEditor.H2 />
                    <RichTextEditor.H3 />
                    <RichTextEditor.H4 />
                </RichTextEditor.ControlsGroup>

                <RichTextEditor.ControlsGroup>
                    <RichTextEditor.Blockquote />
                    <RichTextEditor.Hr />
                    <RichTextEditor.BulletList />
                    <RichTextEditor.OrderedList />
                    <RichTextEditor.TaskList />
                    <RichTextEditor.Subscript />
                    <RichTextEditor.Superscript />
                </RichTextEditor.ControlsGroup>

                <RichTextEditor.ControlsGroup>
                    <RichTextEditor.Link />
                    <RichTextEditor.Unlink />
                </RichTextEditor.ControlsGroup>

                <RichTextEditor.ControlsGroup>
                    <RichTextEditor.AlignLeft />
                    <RichTextEditor.AlignCenter />
                    <RichTextEditor.AlignJustify />
                    <RichTextEditor.AlignRight />
                </RichTextEditor.ControlsGroup>

                <RichTextEditor.ControlsGroup>
                    <RichTextEditor.Control
                        onClick={convertToLowerCase}
                        aria-label="Lowercase the document"
                        title="Lowercase the document"
                    >
                        <IconLetterCaseLower stroke={1.5} size="1rem" />
                    </RichTextEditor.Control>

                    <RichTextEditor.Control
                        onClick={toggleCase}
                        aria-label="Toggle case of the document"
                        title="Toggle case of the document"
                    >
                        <IconLetterCaseToggle stroke={1.5} size="1rem" />
                    </RichTextEditor.Control>

                    <RichTextEditor.Control
                        onClick={convertToUpperCase}
                        aria-label="Uppercase the document"
                        title="Uppercase the document"
                    >
                        <IconLetterCaseUpper stroke={1.5} size="1rem" />
                    </RichTextEditor.Control>
                </RichTextEditor.ControlsGroup>

                <RichTextEditor.ControlsGroup>
                    <RichTextEditor.Undo />
                    <RichTextEditor.Redo />
                </RichTextEditor.ControlsGroup>

                {/* Grammar Check Toggle 
                <RichTextEditor.ControlsGroup>
                    <Button onClick={toggleGrammarCheck} variant="outline" size="xs" color={isGrammarCheckEnabled ? 'green' : 'gray'}>
                        {isGrammarCheckEnabled ? 'Grammer' : 'Grammer'}
                    </Button>
                </RichTextEditor.ControlsGroup>*/}

            </RichTextEditor.Toolbar>

            <RichTextEditor.Content style={{ minHeight: '300px', maxHeight: '600px', overflowY: 'auto' }} />
        </RichTextEditor>

        <div className={classes.tablesContainer} style={{ display: 'flex', gap: '20px' }}>
            {/* Word frequency */}
            <Paper shadow='sm' radius="sm" p="md" withBorder className={classes.tablePaper} style={{ flex: 2 }}>

                {/* Phrase length selection */}
                <Button.Group>
                    <Button variant="outline" size="xs" color={phraseLength === 1 ? 'dark' : 'gray'} onClick={() => setPhraseLength(1)}>1x</Button>
                    <Button variant="outline" size="xs" color={phraseLength === 2 ? 'dark' : 'gray'} onClick={() => setPhraseLength(2)}>2x</Button>
                    <Button variant="outline" size="xs" color={phraseLength === 3 ? 'dark' : 'gray'} onClick={() => setPhraseLength(3)}>3x</Button>
                </Button.Group>

                <Table>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th className={classes.tableHeader}>Phrase</Table.Th>
                            <Table.Th className={classes.tableHeader}>Frequency</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {wordCount === 0 ? (
                            <Table.Tr>
                                <Table.Td colSpan={2} className={classes.tableCell}>
                                    Start typing to display keywords
                                </Table.Td>
                            </Table.Tr>
                        ) : (
                            Object.entries(wordFrequency)
                                .sort(([, a], [, b]) => b - a) // Sort by frequency in descending order
                                .slice(0, 10) // Take the top 10 entries
                                .map(([phrase, freq]) => {
                                    const percentage = Math.round((freq / wordCount) * 100);
                                    return (
                                        <Table.Tr key={phrase}>
                                            <Table.Td className={classes.tableCell}>{phrase}</Table.Td>
                                            <Table.Td className={classes.tableCell}>{freq} ({percentage}%)</Table.Td>
                                        </Table.Tr>
                                    );
                                })
                        )}
                    </Table.Tbody>
                </Table>
            </Paper>

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {/* Text statistics */}
                <Paper shadow='sm' radius="sm" p="md" withBorder className={classes.tablePaper}>
                    <Table>
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th className={classes.tableHeader}>Statistic</Table.Th>
                                <Table.Th className={classes.tableHeader}>Count</Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            <StatisticRow label="Words" value={wordCount} color="#ff9999" />
                            <StatisticRow label="Characters" value={charCount} color="#9999ff" />
                            <StatisticRow label="Sentences" value={sentenceCount} color="#99ff99" />
                            <StatisticRow label="Paragraphs" value={paragraphCount} color="#ffcc99" />
                            
                            <StatisticRow label="Reading Time" value={calculateReadingTime(wordCount)} color="#cc99ff" />
                            <StatisticRow label="Speaking Time" value={calculateSpeakingTime(wordCount)} color="#cc99ff" />
                            <StatisticRow label="Reading Level" value={readingLevelDescription} color="#cc99ff" />
                            <StatisticRow label="Autosaved" value="Yes" color="#cc99ff" />
                            
                        </Table.Tbody>
                    </Table>
                </Paper>

                {/* Export button */}
                <Paper shadow='sm' radius="sm" p="md" withBorder>
                    <Button onClick={exportToMarkdown} variant="outline" size="md" fullWidth>
                        Export as Markdown
                    </Button>
                </Paper>
            </div>
        </div>
    </Container>
}
