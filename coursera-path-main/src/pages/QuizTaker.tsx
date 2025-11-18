import { useState, useEffect } from "react";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  BookOpen,
  ArrowLeft,
  Clock,
  Award,
  CheckCircle,
  XCircle,
  TrendingUp,
  TrendingDown,
  Trophy,
  Share2,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const QuizTaker = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  const course = location.state?.course;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes

  // Mock quiz questions - in real app, these would be AI-generated
  const questions: Question[] = [
    {
      id: 1,
      question: "What is the primary purpose of HTML in web development?",
      options: [
        "To style the webpage",
        "To structure the content of a webpage",
        "To add interactivity",
        "To manage databases",
      ],
      correctAnswer: 1,
      explanation: "HTML (HyperText Markup Language) is used to structure the content of webpages, defining elements like headings, paragraphs, links, and more.",
    },
    {
      id: 2,
      question: "Which CSS property is used to change the text color of an element?",
      options: ["font-color", "text-color", "color", "text-style"],
      correctAnswer: 2,
      explanation: "The 'color' property in CSS is used to set the color of text within an element.",
    },
    {
      id: 3,
      question: "What does JavaScript primarily add to a website?",
      options: ["Structure", "Styling", "Interactivity", "Database connectivity"],
      correctAnswer: 2,
      explanation: "JavaScript is a programming language that adds interactivity and dynamic behavior to websites, such as responding to user actions.",
    },
    {
      id: 4,
      question: "What is the box model in CSS?",
      options: [
        "A design pattern for layouts",
        "The concept describing how elements are rendered with content, padding, border, and margin",
        "A JavaScript framework",
        "A type of HTML element",
      ],
      correctAnswer: 1,
      explanation: "The CSS box model describes how elements are rendered on a page, consisting of content, padding, border, and margin areas.",
    },
    {
      id: 5,
      question: "Which HTML tag is used to create a hyperlink?",
      options: ["<link>", "<a>", "<href>", "<url>"],
      correctAnswer: 1,
      explanation: "The <a> tag (anchor tag) is used to create hyperlinks in HTML, with the href attribute specifying the destination URL.",
    },
    {
      id: 6,
      question: "What is responsive design?",
      options: [
        "Designing websites that respond quickly",
        "Creating designs that adapt to different screen sizes",
        "Using animations in design",
        "Optimizing images",
      ],
      correctAnswer: 1,
      explanation: "Responsive design is an approach where websites adapt their layout and content to provide optimal viewing across different devices and screen sizes.",
    },
    {
      id: 7,
      question: "Which of the following is NOT a valid CSS selector?",
      options: [".class", "#id", "$variable", "element"],
      correctAnswer: 2,
      explanation: "$variable is not a valid CSS selector. CSS uses . for classes, # for IDs, and element names for element selectors.",
    },
    {
      id: 8,
      question: "What is the purpose of the <head> section in HTML?",
      options: [
        "To display the main content",
        "To contain metadata and links to external resources",
        "To create headers",
        "To add navigation",
      ],
      correctAnswer: 1,
      explanation: "The <head> section contains metadata about the document, including title, links to stylesheets, scripts, and other information not displayed on the page.",
    },
    {
      id: 9,
      question: "Which JavaScript method is used to select an element by its ID?",
      options: ["getElement()", "getElementById()", "selectId()", "findElement()"],
      correctAnswer: 1,
      explanation: "document.getElementById() is the JavaScript method used to select and return an element from the DOM using its ID attribute.",
    },
    {
      id: 10,
      question: "What does CSS stand for?",
      options: [
        "Computer Style Sheets",
        "Cascading Style Sheets",
        "Creative Style System",
        "Coded Style Syntax",
      ],
      correctAnswer: 1,
      explanation: "CSS stands for Cascading Style Sheets, which is used to style and layout web pages.",
    },
  ];

  useEffect(() => {
    if (!showResults && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showResults) {
      handleSubmitQuiz();
    }
  }, [timeLeft, showResults]);

  useEffect(() => {
    setAnswers(new Array(questions.length).fill(null));
  }, []);

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(answers[currentQuestion + 1]);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(answers[currentQuestion - 1]);
    }
  };

  const handleSubmitQuiz = () => {
    setShowResults(true);
    const score = calculateScore();
    const percentage = (score / questions.length) * 100;

    toast({
      title: percentage >= 70 ? "Congratulations! 🎉" : "Keep Learning! 📚",
      description:
        percentage >= 70
          ? `You scored ${score}/${questions.length}! Certificate unlocked.`
          : `You scored ${score}/${questions.length}. Try again to pass.`,
    });
  };

  const calculateScore = () => {
    return answers.reduce((score, answer, index) => {
      return answer === questions[index].correctAnswer ? score + 1 : score;
    }, 0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const score = showResults ? calculateScore() : 0;
  const percentage = showResults ? (score / questions.length) * 100 : 0;
  const passed = percentage >= 70;

  if (showResults) {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <Link to="/app" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Dashboard</span>
            </Link>
          </div>
        </header>

        {/* Results */}
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            {/* Score Card */}
            <Card className={`p-8 md:p-12 text-center mb-8 ${passed ? "bg-gradient-hero" : "bg-muted"}`}>
              <div
                className={`w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center ${
                  passed ? "bg-white/20" : "bg-background"
                }`}
              >
                {passed ? (
                  <Trophy className={`w-10 h-10 ${passed ? "text-white" : "text-muted-foreground"}`} />
                ) : (
                  <Award className={`w-10 h-10 ${passed ? "text-white" : "text-muted-foreground"}`} />
                )}
              </div>
              <h1 className={`text-3xl md:text-4xl font-bold mb-4 ${passed ? "text-white" : "text-foreground"}`}>
                {passed ? "Congratulations! 🎉" : "Keep Learning! 📚"}
              </h1>
              <div className={`text-6xl font-bold mb-2 ${passed ? "text-white" : "text-foreground"}`}>
                {score}/{questions.length}
              </div>
              <div className={`text-xl mb-6 ${passed ? "text-white/90" : "text-muted-foreground"}`}>
                {Math.round(percentage)}% Score
              </div>
              <p className={`text-lg ${passed ? "text-white/90" : "text-muted-foreground"}`}>
                {passed
                  ? "You've successfully completed the quiz! Your certificate is ready."
                  : "You need 70% to pass. Review the material and try again."}
              </p>
            </Card>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              {passed ? (
                <>
                  <Button variant="hero" size="lg">
                    <Award className="mr-2 w-5 h-5" />
                    Get Certificate (₹299)
                  </Button>
                  <Button variant="outline" size="lg">
                    <Share2 className="mr-2 w-5 h-5" />
                    Share Result
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="hero" size="lg" onClick={() => window.location.reload()}>
                    Retake Quiz
                  </Button>
                  <Button variant="outline" size="lg" onClick={() => navigate(`/app/course/${id}`)}>
                    Review Course
                  </Button>
                </>
              )}
            </div>

            {/* Detailed Results */}
            <Card className="p-6 mb-6">
              <h2 className="text-xl font-bold mb-4">Performance Analysis</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-secondary mb-1">{score}</div>
                  <div className="text-sm text-muted-foreground">Correct Answers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-destructive mb-1">{questions.length - score}</div>
                  <div className="text-sm text-muted-foreground">Incorrect Answers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-1">{Math.round(percentage)}%</div>
                  <div className="text-sm text-muted-foreground">Overall Score</div>
                </div>
              </div>
            </Card>

            {/* Question Review */}
            <div>
              <h2 className="text-xl font-bold mb-4">Answer Review</h2>
              <div className="space-y-4">
                {questions.map((q, index) => {
                  const userAnswer = answers[index];
                  const isCorrect = userAnswer === q.correctAnswer;
                  return (
                    <Card key={q.id} className={`p-6 ${isCorrect ? "border-secondary" : "border-destructive"}`}>
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          {isCorrect ? (
                            <CheckCircle className="w-6 h-6 text-secondary" />
                          ) : (
                            <XCircle className="w-6 h-6 text-destructive" />
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold mb-3">
                            Question {index + 1}: {q.question}
                          </h3>
                          <div className="space-y-2 mb-4">
                            {q.options.map((option, optIndex) => (
                              <div
                                key={optIndex}
                                className={`p-3 rounded-lg text-sm ${
                                  optIndex === q.correctAnswer
                                    ? "bg-secondary/10 border-2 border-secondary"
                                    : optIndex === userAnswer && !isCorrect
                                    ? "bg-destructive/10 border-2 border-destructive"
                                    : "bg-muted"
                                }`}
                              >
                                <div className="flex items-center gap-2">
                                  {optIndex === q.correctAnswer && <CheckCircle className="w-4 h-4 text-secondary" />}
                                  {optIndex === userAnswer && !isCorrect && <XCircle className="w-4 h-4 text-destructive" />}
                                  <span>{option}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="text-sm text-muted-foreground bg-muted p-3 rounded-lg">
                            <span className="font-semibold">Explanation: </span>
                            {q.explanation}
                          </div>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to={`/app/course/${id}`} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium hidden md:inline">Back to Course</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4" />
              <span className={timeLeft < 60 ? "text-destructive font-semibold" : ""}>{formatTime(timeLeft)}</span>
            </div>
            <Badge>
              Question {currentQuestion + 1}/{questions.length}
            </Badge>
          </div>
        </div>
      </header>

      {/* Progress */}
      <div className="border-b">
        <Progress value={(currentQuestion / questions.length) * 100} className="h-1 rounded-none" />
      </div>

      {/* Quiz Content */}
      <main className="flex-1 container mx-auto px-4 py-8 max-w-3xl">
        <Card className="p-6 md:p-8 shadow-large mb-6">
          <div className="mb-6">
            <Badge className="mb-4">Question {currentQuestion + 1}</Badge>
            <h2 className="text-xl md:text-2xl font-bold">{question.question}</h2>
          </div>

          <RadioGroup value={selectedAnswer?.toString()} onValueChange={(value) => handleAnswerSelect(parseInt(value))}>
            <div className="space-y-3">
              {question.options.map((option, index) => (
                <div
                  key={index}
                  className={`flex items-start space-x-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    selectedAnswer === index
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50 hover:bg-muted/50"
                  }`}
                  onClick={() => handleAnswerSelect(index)}
                >
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} className="mt-1" />
                  <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer text-base">
                    {option}
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button onClick={handlePrevious} variant="outline" disabled={currentQuestion === 0}>
            Previous
          </Button>

          <div className="flex gap-2">
            {questions.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  answers[index] !== null ? "bg-primary" : index === currentQuestion ? "bg-primary/50" : "bg-muted"
                }`}
              ></div>
            ))}
          </div>

          {currentQuestion < questions.length - 1 ? (
            <Button onClick={handleNext} variant="hero" disabled={selectedAnswer === null}>
              Next
            </Button>
          ) : (
            <Button onClick={handleSubmitQuiz} variant="hero" disabled={answers.some((a) => a === null)}>
              Submit Quiz
            </Button>
          )}
        </div>
      </main>
    </div>
  );
};

export default QuizTaker;
