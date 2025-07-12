from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from speedtest import Speedtest
import time
import statistics

@csrf_exempt
def optimize_network(request):
    if request.method == "POST":
        try:
            st = Speedtest()
            st.get_best_server()

            ping_samples = []
            for _ in range(3):
                st.get_best_server()
                ping_samples.append(st.results.ping)
                time.sleep(1)

            avg_ping = round(statistics.mean(ping_samples), 2)
            jitter = round(statistics.stdev(ping_samples), 2) if len(ping_samples) > 1 else 0
            download_speed = round(st.download() / 1_000_000, 2)
            upload_speed = round(st.upload() / 1_000_000, 2)

            # Optimization suggestions
            suggestions = []

            if download_speed < 10:
                suggestions.append("Consider reducing background downloads or streaming.")

            if upload_speed < 2:
                suggestions.append("Close apps that use a lot of upload bandwidth (e.g., cloud backup).")

            if avg_ping > 100:
                suggestions.append("Move closer to the router or switch to Ethernet.")

            if jitter > 20:
                suggestions.append("Check for interference or too many devices on the network.")

            # Derive efficiency, stability, and signal from stats
            if download_speed >= 50 and avg_ping < 50 and jitter < 10:
                efficiency = 95
                stability = "Excellent"
                signal = "Strong"
            elif download_speed >= 20 and avg_ping < 100:
                efficiency = 85
                stability = "Moderate"
                signal = "Good"
            else:
                efficiency = 60
                stability = "Unstable"
                signal = "Weak"

            return JsonResponse({
                "efficiency": efficiency,
                "stability": stability,
                "signal": signal,
                "network_stats": {
                    "avg_ping": avg_ping,
                    "jitter": jitter,
                    "download_speed": download_speed,
                    "upload_speed": upload_speed
                },
                "suggestions": suggestions or ["Your network is in good condition."]
            })

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Only POST requests are allowed."}, status=405)
