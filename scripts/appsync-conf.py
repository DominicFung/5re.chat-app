import subprocess, time
# import pyautogui

print('Launching new process...')
p=subprocess.Popen(["amplify", "add", "codegen", "--apiId", "s22pc65ilnc6bl25vxpi7vmjt4"],
    stdin=subprocess.PIPE,
    stdout=subprocess.PIPE,
    stderr=subprocess.PIPE,
    universal_newlines=True)

line=p.stdout.readline()
print(line) # Successfully added API fireChat to your Amplify project

while True:
  line = p.stdout.readline()
  print("line: ", line)

  p.stdin.write("^[[B")
  time.sleep(1)
  p.stdin.write("\r")
  if not line or "javascript" in line:
    break

print('Down arrow ...')
# p.stdin.write("\x1B[B")
p.stdin.write("^[[B")
time.sleep(1)
p.stdin.write("\r")

print('set down and enter')

# pyautogui.press('down')
# pyautogui.press('enter')

print("HERE")
time.sleep(1)

while True:
  line = p.stdout.readline()
  print("line: ", line)

  time.sleep(1)
  if not line or "javascript" in line:
    break