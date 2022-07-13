# def swapList(newList):
#     size = len(newList)
     
#     temp = newList[0]
#     newList[0] = newList[size - 1]
#     newList[size - 1] = temp
     
#     return newList
     
# newList = [12, 35, 9, 56, 24]
 
# print(swapList(newList))
# import turtle             
# turtle.forward(100)
# from turtle import *
# color('red', 'yellow')
# begin_fill()
# while True:
#     forward(200)
#     left(170)
#     if abs(pos()) < 1:
#         break
# end_fill()
# done()


# import pygal
# # Our data is a list of series.
# # Each series is a list with a label and a list of data points
# data = [["Firefox", [None, None, 0, 16.6,   25,   31, 36.4, 45.5, 46.3, 42.8, 37.1]],
#         ["Chrome",  [None, None, None, None, None, None,    0,  3.9, 10.8, 23.8, 35.3]],
#         ["IE",      [85.8, 84.6, 84.7, 74.5,   66, 58.6, 54.7, 44.8, 36.2, 26.6, 20.1]],
#         ["Others",  [14.2, 15.4, 15.3,  8.9,    9, 10.4,  8.9,  5.8,  6.7,  6.8,  7.5]]]


# # Make a Pygal chart
# stackedline_chart = pygal.StackedLine(fill=True)
# stackedline_chart.title = "Browser usage evolution (in %)"
# stackedline_chart.x_labels = map(str, range(2002, 2013))

# # For each series in our data, add label and data points
# for label, data_points in data:
#     stackedline_chart.add(label, data_points)

# # Render the chart
# stackedline_chart.render()

# # Example modified from the pygal.org documentation
# print("hey you checker!")
# import turtle
# import tkinter as tk

# def forward():
#     t.forward(100)

# def back():
#     t.back(100)

# def left():
#     t.left(90)

# def right():
#     t.right(90)

# root = tk.Tk()
# canvas = tk.Canvas(master = root, width = 500, height = 500)
# canvas.pack()

# t = turtle.RawTurtle(canvas)
# t.pencolor("#ff0000") # Red

# t.penup()   # Regarding one of the comments
# t.pendown() # Regarding one of the comments

# tk.Button(master = root, text = "Forward", command = forward).pack(side = tk.LEFT)
# tk.Button(master = root, text = "Back", command = back).pack(side = tk.LEFT)
# tk.Button(master = root, text = "Left", command = left).pack(side = tk.LEFT)
# tk.Button(master = root, text = "Right", command = right).pack(side = tk.LEFT)

# root.mainloop()



# import sqlite3

# connection = sqlite3.connect('shows.db')
# cursor = connection.cursor()
# cursor.execute('''CREATE TABLE IF NOT EXISTS Shows
#               (Title TEXT, Director TEXT, Year INT)''')

# connection.commit()
# connection.close()


# import sqlite3
# from sqlite3 import Error


# def create_connection():
#     """ create a database connection to a database that resides
#         in the memory
#     """
#     conn = None
#     try:
#         conn = sqlite3.connect(':memory:')
#         print(sqlite3.version)
#     except Error as e:
#         print(e)
#     finally:
#         if conn:
#             conn.close()


# if __name__ == '__main__':
#     create_connection()


# Hangman Game
import random
from collections import Counter

words = '''area addition circle circumference deposit diameter division calculate fibonacci palindrome factor subtraction multiplication product minus result answer positive negative percentage grade volume cylinder square rectangle sphere'''

words = words.split(' ')
selectWord = random.choice(words)       # randomly choose a secret word from our "words" LIST.		

if __name__ == '__main__':
	print('Guess the word! HINT: word is related to Math')
	
	for i in selectWord:
		print('_', end = ' ')	# For printing the empty spaces for letters of the word
	print()

	playing = True
	letterGuessed = ''       # list for storing the letters guessed by the player			
	chances = len(selectWord) + 2
	correct = 0
	flag = 0
	try:
		while (chances != 0) and flag == 0: #flag is updated when the word is correctly guessed
			print()
			chances -= 1

			try:
				guess = str(input('Enter a letter to guess: '))
			except:
				print('Enter only a letter!')
				continue

			# Validation of the guess
			if not guess.isalpha():
				print('Enter only a LETTER')
				continue
			elif len(guess) > 1:
				print('Enter only a SINGLE letter')
				continue
			elif guess in letterGuessed:
				print('You have already guessed that letter')
				continue


			# If letter is guessed correctly
			if guess in selectWord:
				k = selectWord.count(guess) #k stores the number of times the guessed letter occurs in the word
				for _ in range(k):
					letterGuessed += guess # The guess letter is added as many times as it occurs

			# Print the word
			for char in selectWord:
				if char in letterGuessed and (Counter(letterGuessed) != Counter(selectWord)):
					print(char, end = ' ')
					correct += 1
					
				# If user has guessed all the letters
				if (Counter(letterGuessed) == Counter(selectWord)):      # Once the correct word is guessed fully,
					print("The word is: ", end=' ')                  # the game ends, even if chances remain
					print(selectWord)
					flag = 1
					print('Congratulations, You won!')
					break               # To break out of the for loop
					break               # To break out of the while loop
				else:
					print('_', end = ' ')

			

		# If user has used all of his chances
		if chances <= 0 and (Counter(letterGuessed) != Counter(selectWord)):
			print()
			print('You lost! Try again..')
			print('The word was {}'.format(selectWord))

	except KeyboardInterrupt:
		print()
		print('Bye! Try again.')
		exit()


