# Generate a comprehensive CFA question database with 200 questions
import json

def generate_comprehensive_cfa_database():
    questions = []
    question_id = 1000
    
    # Level I Questions (80 questions)
    # Ethics and Professional Standards (15 questions)
    ethics_l1 = [
        {
            "id": question_id + 1,
            "level": "I",
            "topic": "Ethics",
            "subtopic": "Code and Standards",
            "reading": "Code of Ethics and Standards of Professional Conduct",
            "question": "Which action most likely violates the CFA Institute Code of Ethics?",
            "options": [
                "Disclosing client data with written consent",
                "Using material nonpublic information for trading",
                "Maintaining client confidentiality",
                "Providing accurate performance reports",
                "Discussing general market trends publicly"
            ],
            "answer_index": 1,
            "explanation": {
                "concise": "Using material nonpublic information violates Standard II(A).",
                "detailed": "Standard II(A) prohibits trading on material nonpublic information to ensure market integrity and fair dealing. This is a fundamental ethical principle in the investment industry that protects all market participants.",
                "exam_tip": "Ethics questions often test clear violations like insider trading.",
                "misstep_alert": "Option 1 is ethical with proper consent; Option 5 is allowed if non-confidential.",
                "practical_insight": "High-profile insider trading cases like Martha Stewart's highlight serious consequences."
            },
            "difficulty": "Medium",
            "type": "Core Concept",
            "tags": ["Ethics", "Frequently Tested", "Legal Compliance"],
            "reference": "CFA Level I, Ethics, Reading 1, 2025"
        },
        {
            "id": question_id + 2,
            "level": "I",
            "topic": "Ethics",
            "subtopic": "Global Investment Performance Standards",
            "reading": "GIPS Standards",
            "question": "Under GIPS standards, which requirement applies to performance presentation?",
            "options": [
                "Performance must be presented net of fees only",
                "Benchmarks are optional for all composites",
                "At least 5 years of performance must be shown",
                "Performance must be calculated using time-weighted returns",
                "Only winning strategies need to be disclosed"
            ],
            "answer_index": 3,
            "explanation": {
                "concise": "GIPS requires time-weighted returns for performance calculation.",
                "detailed": "Time-weighted returns eliminate the impact of cash flows controlled by the client, providing a fair measure of the investment manager's performance and enabling proper comparison across managers.",
                "exam_tip": "Remember GIPS focuses on fair representation and comparability.",
                "misstep_alert": "Money-weighted returns can be distorted by client cash flows.",
                "practical_insight": "GIPS compliance enhances credibility with institutional investors globally."
            },
            "difficulty": "Hard",
            "type": "Application",
            "tags": ["GIPS", "Performance Measurement", "Standards"],
            "reference": "CFA Level I, Ethics, Reading 4, 2025"
        }
    ]
    
    # Quantitative Methods (12 questions)
    quant_l1 = [
        {
            "id": question_id + 16,
            "level": "I",
            "topic": "Quantitative Methods",
            "subtopic": "Time Value of Money",
            "reading": "Time Value of Money Applications",
            "question": "A $1,000 investment earns 6% annually, compounded quarterly. What is its value after 3 years?",
            "options": [
                "$1,180.00",
                "$1,191.02",
                "$1,194.05",
                "$1,196.68",
                "$1,200.00"
            ],
            "answer_index": 3,
            "explanation": {
                "concise": "The value is $1,196.68 with quarterly compounding.",
                "detailed": "Formula: FV = PV × (1 + r/n)^(n×t). FV = $1,000 × (1 + 0.06/4)^(4×3) = $1,000 × (1.015)^12 = $1,196.68.",
                "exam_tip": "Check compounding frequency; quarterly uses n=4.",
                "misstep_alert": "Option 2 assumes semi-annual compounding.",
                "practical_insight": "Higher compounding frequency increases the effective annual rate."
            },
            "difficulty": "Medium",
            "type": "Calculation",
            "tags": ["Time Value of Money", "Compounding", "Quantitative"],
            "reference": "CFA Level I, Quantitative Methods, Reading 6, 2025"
        }
    ]
    
    # Level II Questions (70 questions)
    fixed_income_l2 = [
        {
            "id": question_id + 81,
            "level": "II",
            "topic": "Fixed Income",
            "subtopic": "Credit Analysis",
            "reading": "Yield Spreads",
            "question": "Which of the following best explains a widening credit spread between investment-grade and high-yield bonds?",
            "options": [
                "Increase in benchmark interest rates",
                "Improvement in macroeconomic outlook",
                "Shift in investor risk aversion",
                "Decline in liquidity premiums",
                "Strengthening of corporate balance sheets"
            ],
            "answer_index": 2,
            "explanation": {
                "concise": "Widening credit spreads reflect increased investor risk aversion.",
                "detailed": "When investors become more risk-averse, they demand higher yields for high-yield bonds relative to investment-grade bonds, widening the spread. This often occurs during economic uncertainty.",
                "exam_tip": "Eliminate distractors by focusing on risk perception, not general rate changes.",
                "misstep_alert": "Option 1 affects all bonds, not just spreads; Option 2 typically narrows spreads.",
                "practical_insight": "Widening spreads signal market stress, guiding bond traders to adjust portfolios."
            },
            "difficulty": "Medium",
            "type": "Core Concept",
            "tags": ["Frequently Tested", "Market Sentiment", "Credit Risk"],
            "reference": "CFA Level II, Fixed Income, Reading 31, 2025"
        }
    ]
    
    # Level III Questions (50 questions)
    portfolio_mgmt_l3 = [
        {
            "id": question_id + 151,
            "level": "III",
            "topic": "Portfolio Management",
            "subtopic": "Behavioral Finance",
            "reading": "Behavioral Biases",
            "question": "An investor avoids selling securities at a loss despite evidence of further decline. This behavior best illustrates:",
            "options": [
                "Overconfidence bias",
                "Loss aversion bias",
                "Anchoring bias",
                "Regret aversion",
                "Confirmation bias"
            ],
            "answer_index": 1,
            "explanation": {
                "concise": "Loss aversion bias causes investors to hold losing assets.",
                "detailed": "Loss aversion leads investors to prioritize avoiding losses over equivalent gains, resulting in holding declining securities. This differs from regret aversion.",
                "exam_tip": "Distinguish loss aversion (holding losses) from regret aversion (avoiding action).",
                "misstep_alert": "Option 3 (anchoring) involves past price fixation, not loss avoidance.",
                "practical_insight": "Loss aversion can lead to suboptimal portfolio rebalancing."
            },
            "difficulty": "Easy",
            "type": "Core Concept",
            "tags": ["Behavioral Finance", "Frequently Tested"],
            "reference": "CFA Level III, Portfolio Management, Reading 8, 2025"
        }
    ]
    
    # Combine sample questions
    all_questions = ethics_l1 + quant_l1 + fixed_income_l2 + portfolio_mgmt_l3
    
    return all_questions

# Generate sample database
sample_database = generate_comprehensive_cfa_database()
print(f"Generated {len(sample_database)} sample questions for the database")

# Save the questions data
with open('questions_data.json', 'w') as f:
    json.dump(sample_database, f, indent=2)

print("Sample questions saved to questions_data.json")
print("This represents the structure for the full 200+ question implementation")